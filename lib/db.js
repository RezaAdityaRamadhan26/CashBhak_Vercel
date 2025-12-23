import mysql from "mysql2/promise";

// Konfigurasi SSL untuk Aiven MySQL
// Solusi untuk self-signed certificate di Vercel
let sslConfig;

if (process.env.DB_CA) {
  // Jika ada CA certificate, gunakan dengan berbagai format
  const caCert = process.env.DB_CA.replace(/\\n/g, "\n") // Handle \n literal
    .replace(/^\s+|\s+$/g, ""); // Trim whitespace

  sslConfig = {
    ca: caCert,
    rejectUnauthorized: false, // Disable untuk self-signed cert
  };
} else {
  // Fallback jika tidak ada CA
  sslConfig = {
    rejectUnauthorized: false,
  };
}

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
