const express = require('express');
const cors = require('cors'); // Ensure cors is installed
require('dotenv').config(); // Load environment variables

const app = express();

const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Root route
app.get('/', (req, res) => {
    res.send('SkillSwap Backend is running hopefully!');
});

// API route to fetch the Clerk publishable key
app.get('/api/clerk-key', (req, res) => {
    const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    if (!clerkKey) {
        return res.status(500).json({ error: 'CLERK_PUBLISHABLE_KEY is not set.' });
    }
    res.status(200).json({ key: clerkKey });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
