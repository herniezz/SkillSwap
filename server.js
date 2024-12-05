const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Root route handler
app.get('/', (req, res) => {
    res.send('SkillSwap Backend is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
