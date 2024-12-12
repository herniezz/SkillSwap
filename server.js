const express = require('express');
const cors = require('cors');
require('dotenv').config();
const AWS = require('aws-sdk'); // Import AWS SDK

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse JSON body for POST requests
app.use(express.json());

// Configure AWS SDK
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
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

// Route for generating S3 signed URLs
app.post('/api/images/sign', async (req, res) => {
    console.log('Incoming request body:', req.body);

    const { fileName, fileType } = req.body;
    if (!fileName || !fileType) {
        return res.status(400).json({ error: 'fileName or fileType is missing' });
    }

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read',
    };

    try {
        const signedUrl = await s3.getSignedUrlPromise('putObject', params);
        console.log('Signed URL generated:', signedUrl);
        res.json({
            signedUrl,
            url: `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`,
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
