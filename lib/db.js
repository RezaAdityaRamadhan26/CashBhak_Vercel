import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // Penting: Pastikan port dikonversi ke angka
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Konfigurasi SSL khusus untuk Aiven
  ssl:
    process.env.DB_HOST && process.env.DB_HOST !== "localhost"
      ? {
          rejectUnauthorized: true, // Set true karena kita menggunakan CA
          ca: process.env.DB_CA, // Mengambil sertifikat dari Env Variable Vercel
        }
      : undefined,
});

export default pool;
