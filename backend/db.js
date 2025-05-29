const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: false,
});

pool.connect() // test db connection
  .then(client => {
    console.log('✅ Successfully connected to PostgreSQL!');
    client.release();
  })
  .catch(err => console.error('❌ Database connection error:', err));

module.exports = pool;
