// server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import AWS SDK v3 modules
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const app = express();
const PORT = process.env.PORT || 3000;

// Define allowed origins
const allowedOrigins = [
    'https://herniezz.github.io',    // Production frontend
    'http://localhost:3000',        // Development frontend
    'http://127.0.0.1:3000',        // Additional development origin
    // Add other origins as needed
];

// Enable CORS with specific configuration
app.use(cors({
    origin: function(origin, callback){
        console.log('Incoming request origin:', origin); // Log the origin
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1){
            // Origin is allowed
            callback(null, true);
        }
        else{
            // Origin is not allowed
            callback(new Error('CORS policy does not allow access from the specified Origin.'), false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-amz-acl'],
    credentials: true, // If you need to send cookies or authentication headers
}));

// Parse JSON body for POST requests
app.use(express.json());

// Configure AWS SDK v3 S3 Client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Default route
app.get('/', (req, res) => {
    res.send('SkillSwap Backend is running hopefully!');
});

// Route for getting Clerk publishable key
app.get('/api/clerk-key', (req, res) => {
    // Prevent caching
    res.set('Cache-Control', 'no-store');

    const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    if (!clerkKey) {
        return res.status(500).json({ error: 'CLERK_PUBLISHABLE_KEY is not set.' });
    }
    res.status(200).json({ publishableKey: clerkKey });
});

// Route for generating S3 signed URLs using AWS SDK v3
app.post('/api/images/sign', async (req, res) => {
    console.log('Incoming request body:', req.body);

    const { fileName, fileType } = req.body;
    if (!fileName || !fileType) {
        return res.status(400).json({ error: 'fileName or fileType is missing' });
    }

    // Optional: Generate a unique filename to prevent collisions
    const uniqueFileName = `${Date.now()}-${fileName}`;

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: uniqueFileName,
        ContentType: fileType,
        ACL: 'public-read', // Must match the header in the PUT request
    };

    try {
        const command = new PutObjectCommand(params);
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 }); // URL valid for 60 seconds

        const fileUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;

        console.log('Signed URL generated:', signedUrl);
        res.json({
            signedUrl,
            url: fileUrl,
        });
    } catch (error) {
        console.error('Error generating signed URL:', error);
        res.status(500).json({ error: 'Could not generate signed URL' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
