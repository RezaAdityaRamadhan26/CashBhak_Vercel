import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // Pastikan port jadi number
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // KONFIGURASI SSL untuk mengatasi self-signed certificate
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
