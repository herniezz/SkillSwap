const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('SkillSwap Backend is running hopefully!');
});

app.get('/api/clerk-key', (req, res) => {
    // Prevent caching
    res.set('Cache-Control', 'no-store');

    const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    if (!clerkKey) {
        return res.status(500).json({ error: 'CLERK_PUBLISHABLE_KEY is not set.' });
    }
    res.status(200).json({ publishableKey: clerkKey });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
