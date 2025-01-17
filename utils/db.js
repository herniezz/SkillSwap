const { Pool } = require('pg');

// Create a new pool instance with your database credentials or connection string.
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // typically provided by Heroku
    ssl: {
        rejectUnauthorized: false, // required for Heroku SSL connections
    },
});