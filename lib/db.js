import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // Pastikan dikonversi ke Number
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl:
    process.env.DB_HOST && process.env.DB_HOST !== "localhost"
      ? {
          rejectUnauthorized: true, // Ubah jadi true agar lebih aman (opsional)
          ca: process.env.DB_CA, // Gunakan CA dari env variable Aiven
        }
      : undefined,
});

export default pool;
