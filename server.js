const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

// Enable CORS
const allowedOrigins = ['https://herniezz.github.io/SkillSwap/']; // Replace with your GitHub Pages URL
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// API endpoint for Clerk publishable key
app.get('/api/clerk-key', (req, res) => {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    if (!publishableKey) {
        res.status(500).json({ error: 'CLERK_PUBLISHABLE_KEY is not set.' });
    } else {
        res.json({ publishableKey });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
