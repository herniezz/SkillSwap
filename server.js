const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// root routing
app.get('/', (req, res) => {
    res.send('please, I beg you, work :((');
});

// API route to expose Clerk publishableKey
app.get('/api/clerk-key', (req, res) => {
    res.json({ publishableKey: process.env.CLERK_PUBLISHABLE_KEY });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
