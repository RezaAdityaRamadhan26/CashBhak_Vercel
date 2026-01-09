import mysql from "mysql2/promise";

// Konfigurasi SSL untuk Aiven MySQL
// Solusi untuk self-signed certificate di Vercel
let sslConfig = {
  rejectUnauthorized: false,
};

if (process.env.DB_CA) {
  try {
    // Parse CA certificate dari environment variable
    const caCert = process.env.DB_CA.replace(/\\n/g, "\n") // Convert literal \n to actual newlines
      .replace(/\\r/g, "\r") // Convert literal \r to actual carriage returns
      .trim();

    sslConfig = {
      ca: [caCert],
      rejectUnauthorized: false, // Aiven menggunakan self-signed certificate
    };
  } catch (error) {
    console.warn(
      "Failed to parse DB_CA certificate, using fallback:",
      error.message
    );
  }
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 24251,
  user: process.env.DB_USER,
  password: process.env.DB_PASS ? process.env.DB_PASS.trim() : undefined,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: sslConfig,
  authPlugins: {
    mysql_native_password: () => () => process.env.DB_PASS,
  },
});

// Test connection on startup
pool
  .getConnection()
  .then((connection) => {
    console.log("✓ Database connected successfully");
    console.log("DB Config:", {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
    });
    connection.release();
  })
  .catch((error) => {
    console.error("✗ Database connection failed:", error.message);
    console.error("DB Host:", process.env.DB_HOST);
    console.error("DB Port:", process.env.DB_PORT);
    console.error("DB Name:", process.env.DB_NAME);
    console.error("DB User:", process.env.DB_USER);
  });

export default pool;
