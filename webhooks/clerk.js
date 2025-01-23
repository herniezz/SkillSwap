const express = require('express');
const pool = require('.utils/db'); // Import your database connection pool
const crypto = require('crypto');

const router = express.Router();

// Function to validate the webhook signature
function validateWebhook(req) {
    const signature = req.headers['clerk-signature'];
    const payload = JSON.stringify(req.body);
    const secret = process.env.CLERK_WEBHOOK_SECRET; // Set this in your .env file

    const hash = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('base64');

    return signature === hash;
}

// Webhook route
router.post('/webhooks/clerk', express.json(), async (req, res) => {
    const event = req.body;

    // Validate the webhook signature
    if (!validateWebhook(req)) {
        return res.status(401).send('Invalid webhook signature');
    }

    // Process the event
    if (event.type === 'user.created') {
        const user = event.data;
        const query = `
            INSERT INTO users (name, email, avatar, clerk_user_id)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (clerk_user_id)
            DO UPDATE SET name = EXCLUDED.name, email = EXCLUDED.email, avatar = EXCLUDED.avatar;
        `;

        try {
            await pool.query(query, [
                `${user.firstName} ${user.lastName}`, // Full name
                user.emailAddresses[0].emailAddress, // Primary email
                user.profileImageUrl,                // Avatar URL
                user.id                              // Clerk user ID
            ]);
            res.status(200).send('User added/updated');
        } catch (err) {
            console.error('Database error:', err);
            res.status(500).send('Error processing webhook');
        }
    } else {
        res.status(200).send('Event ignored');
    }
});

module.exports = router;

