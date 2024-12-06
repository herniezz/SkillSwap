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

// Clerk publishableKey route
app.get('/api/clerk-key', (req, res) => {
    const publishableKey = process.env.CLERK_PUBLISHABLE_KEY;
    if (!publishableKey) {
        res.status(500).json({ error: 'CLERK_PUBLISHABLE_KEY is not set.' });
        return;
    }
    res.json({ publishableKey });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
