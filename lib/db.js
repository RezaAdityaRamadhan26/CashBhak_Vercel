import mysql from "mysql2/promise";

// Konfigurasi SSL untuk Aiven MySQL
const sslConfig = process.env.DB_CA
  ? {
      ca: process.env.DB_CA.replace(/\\n/g, "\n"), // Handle escaped newlines
      rejectUnauthorized: true,
    }
  : {
      rejectUnauthorized: false,
    };

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: sslConfig,
});

export default pool;
