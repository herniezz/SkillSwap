// pages/api/test-db.js
import pool from '../../utils/db';

export default async function handler(req, res) {
    try {
        const result = await pool.query('SELECT NOW() as current_time');
        return res.status(200).json({ time: result.rows[0].current_time });
    } catch (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
    }
}
