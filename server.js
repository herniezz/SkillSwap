const express = require('express');
const cors = require('cors');
const app = express();

// Allow request from the frontend part
const FRONTEND_URL = 'https://herniezz.github.io/SkillSwap/'; // Replace with your GitHub Pages URL
app.use(cors({ origin: FRONTEND_URL }));

// Endpoint to serve Clerk publishableKey
app.get('/api/clerk-key', (req, res) => {
    const publishableKey = process.env.CLERK_PUBLISHABLE_KEY;
    if (!publishableKey) {
        console.error("CLERK_PUBLISHABLE_KEY is not set in environment variables, check out the heroku ok.");
        res.status(500).json({ error: "CLERK_PUBLISHABLE_KEY is missing(???)" });
        return;
    }
    res.json({ publishableKey });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
