app.post('/webhooks/clerk', express.json(), async (req, res) => {
    const event = req.body;

    // Validate the webhook (Clerk provides a signature you can verify for security).

    if (event.type === 'user.created') {
        const user = event.data;
        const query = `
      INSERT INTO users (name, email, avatar, clerk_user_id)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (clerk_user_id) DO NOTHING; 
    `;
        try {
            await pool.query(query, [user.firstName + ' ' + user.lastName, user.emailAddresses[0].emailAddress, user.profileImageUrl, user.id]);
            res.status(200).send('User added/updated');
        } catch (err) {
            console.error('Database error:', err);
            res.status(500).send('Error processing webhook');
        }
    } else {
        res.status(200).send('Event ignored');
    }
});
