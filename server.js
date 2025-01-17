const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./utils/db'); // Import the PostgreSQL pool from utils/db.js
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { clerkMiddleware } = require("@clerk/nextjs/server");

const app = express();
const PORT = process.env.PORT || 3000;

// Allowed origins for CORS
const allowedOrigins = [
    'https://herniezz.github.io',    // Production frontend
    'http://localhost:3000',         // Development frontend
    'http://127.0.0.1:3000',         // Additional development origin
];

// Enable CORS with specific configuration
app.use(cors({
    origin: function (origin, callback) {
        console.log('Incoming request origin:', origin);
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS policy does not allow access from the specified Origin.'), false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-amz-acl'],
    credentials: true,
}));

// Parse JSON body for POST requests
app.use(express.json());

// Configure AWS S3 Client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Default route
app.get('/', (req, res) => {
    res.send('SkillSwap Backend is running successfully!');
});

// Route to get Clerk publishable key
app.get('/api/clerk-key', (req, res) => {
    res.set('Cache-Control', 'no-store'); // Prevent caching
    const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

    if (!clerkKey) {
        return res.status(500).json({ error: 'CLERK_PUBLISHABLE_KEY is not set.' });
    }
    res.status(200).json({ publishableKey: clerkKey });
});

// Route to generate S3 signed URLs and save file information to the database
app.post('/api/images/sign', clerkMiddleware(), async (req, res) => {
    const { fileName, fileType } = req.body;
    const clerkUserId = req.auth.userId; // Get Clerk user ID from middleware

    if (!fileName || !fileType) {
        return res.status(400).json({ error: 'fileName or fileType is missing' });
    }

    // Generate a unique filename using the Clerk user ID
    const uniqueFileName = `${clerkUserId}/${Date.now()}-${fileName}`;

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: uniqueFileName,
        ContentType: fileType,
        ACL: 'public-read',
    };

    try {
        const command = new PutObjectCommand(params);
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });

        const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

        // Respond to the client before the database operation
        res.json({ signedUrl, url: fileUrl });

        // Save file URL to the database
        const query = `
      INSERT INTO user_files (clerk_user_id, file_url)
      VALUES ($1, $2)
    `;
        await pool.query(query, [clerkUserId, fileUrl]);
    } catch (error) {
        console.error('Error generating signed URL or saving to database:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Could not generate signed URL or save file info' });
        }
    }
});

// Route to register or update a user after Clerk authentication
app.post('/api/users/register', clerkMiddleware(), async (req, res) => {
    const { userId, firstName, lastName, emailAddresses, profileImageUrl } = req.auth || {};
    const name = `${firstName || ''} ${lastName || ''}`.trim();
    const email = emailAddresses && emailAddresses.length > 0 ? emailAddresses[0].emailAddress : null;

    if (!userId || !email) {
        return res.status(400).json({ error: 'Missing user information' });
    }

    const query = `
    INSERT INTO users (name, email, avatar, clerk_user_id)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (clerk_user_id) DO NOTHING;
  `;
    try {
        await pool.query(query, [name, email, profileImageUrl, userId]);
        res.status(200).json({ message: 'User registered or already exists' });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Secure route example
app.get('/api/secure', clerkMiddleware(), (req, res) => {
    res.json({ message: 'This is a secure route.', userId: req.auth.userId });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
