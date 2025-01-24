require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crypto = require('crypto'); // For webhook signature validation
const pool = require('./utils/db'); // PostgreSQL pool
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { clerkMiddleware } = require('@clerk/nextjs/server');

const app = express();
const PORT = process.env.PORT || 3000;

// Allowed origins for CORS
const allowedOrigins = [
    'https://herniezz.github.io', // Production frontend
    'http://localhost:3000',      // Dev frontend
    'http://127.0.0.1:3000',      // Additional dev origin
];

// Enable CORS with specific configuration
app.use(cors({
    origin: function (origin, callback) {
        console.log('Incoming request origin:', origin);
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS policy does not allow access from the specified origin.'), false);
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

// Function to validate the Clerk webhook signature
function validateWebhook(req) {
    const signature = req.headers['clerk-signature'];
    const payload = JSON.stringify(req.body);
    const secret = process.env.CLERK_WEBHOOK_SECRET; // Set this in your .env file

    const hash = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('base64');

    return signature === hash;
}

// Webhook route for Clerk
app.post('/webhooks/clerk', async (req, res) => {
    const event = req.body;

    // Validate the webhook signature
    if (!validateWebhook(req)) {
        return res.status(401).send('Invalid webhook signature');
    }

    // Handle specific events
    if (event.type === 'user.created') {
        const user = event.data;
        const query = `
            INSERT INTO users (name, email, avatar, clerk_user_id)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (clerk_user_id)
            DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email, avatar = EXCLUDED.avatar;
        `;

        try {
            await pool.query(query, [
                `${user.firstName} ${user.lastName}`, // Full name
                user.emailAddresses[0].emailAddress, // Primary email
                user.profileImageUrl,                // Avatar URL
                user.id                              // Clerk user ID
            ]);
            res.status(200).send('User added/updated');
        } catch (err) {
            console.error('Database error:', err);
            res.status(500).send('Error processing webhook');
        }
    } else {
        res.status(200).send('Event ignored');
    }
});

// Default route
app.get('/', (req, res) => {
    res.send('SkillSwap Backend is running successfully!');
});

// DB TEST ROUTE
app.get('/api/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW() as current_time');
        res.json({ time: result.rows[0].current_time });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Database error' });
    }
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

        res.json({ signedUrl, url: fileUrl });

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
