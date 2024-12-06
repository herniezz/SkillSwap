const express = require('express');
const cors = require('cors');
const app = express();

// fighting with CORS to start working
const FRONTEND_URL = 'https://herniezz.github.io/SkillSwap/';
app.use(cors({ origin: FRONTEND_URL }));

// Root route (basic message for testing)
app.get('/', (req, res) => {
    res.send('HALO PLS WORK');
});

// Route to get the Clerk publishable key
app.get('/api/clerk-key', (req, res) => {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    if (!publishableKey) {
        console.error("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set in env vars");
        res.status(500).json({ error: "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing.;_____;" });
        return;
    }
    res.json({ publishableKey });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
