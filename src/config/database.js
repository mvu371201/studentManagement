const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  max: 5,
  idleTimeoutMillis: 30000, // 30s không sử dụng thì giải phóng kết nối
  connectionTimeoutMillis: 2000,
});

module.exports = pool;

