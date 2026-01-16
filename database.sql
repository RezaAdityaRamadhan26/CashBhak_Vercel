-- ============================================================
-- Database: db_cashbhak
-- Deskripsi: Database untuk Aplikasi Cashier Website
-- Created: 2026-01-09
-- ============================================================

-- Drop database if exists (opsional, untuk reset)
-- DROP DATABASE IF EXISTS db_cashbhak;

-- Create database
CREATE DATABASE IF NOT EXISTS db_cashbhak;
USE db_cashbhak;

-- ============================================================
-- TABLE: users
-- Deskripsi: Menyimpan informasi pengguna/owner toko
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profile_image LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: products
-- Deskripsi: Menyimpan informasi produk/barang yang dijual
-- ============================================================
CREATE TABLE IF NOT EXISTS products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  barcode VARCHAR(100) DEFAULT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  product_image LONGTEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_product_name (product_name),
  INDEX idx_barcode (barcode)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: transactions
-- Deskripsi: Menyimpan informasi transaksi penjualan
-- ============================================================
    CREATE TABLE IF NOT EXISTS transactions (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    payment_method VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLE: transaction_items
-- Deskripsi: Menyimpan detail item dalam setiap transaksi
-- ============================================================
CREATE TABLE IF NOT EXISTS transaction_items (
  transaction_item_id INT PRIMARY KEY AUTO_INCREMENT,
  transaction_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price_per_item DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE RESTRICT,
  INDEX idx_transaction_id (transaction_id),
  INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SAMPLE DATA (Opsional - untuk testing)
-- ============================================================

-- Insert sample user
INSERT INTO users (username, email, password) VALUES 
('john_doe', 'john@example.com', 'hashed_password_123'),
('jane_smith', 'jane@example.com', 'hashed_password_456');

-- Insert sample products for user 1
INSERT INTO products (user_id, product_name, price, stock) VALUES 
(1, 'Laptop Dell XPS 13', 12000000, 5),
(1, 'Mouse Wireless Logitech', 250000, 25),
(1, 'Keyboard Mechanical RGB', 800000, 10),
(1, 'Monitor 27 inch 144Hz', 2500000, 3),
(1, 'Headset Wireless', 500000, 15);

-- Insert sample products for user 2
INSERT INTO products (user_id, product_name, price, stock) VALUES 
(2, 'iPhone 15 Pro', 15000000, 8),
(2, 'iPad Air', 8000000, 4),
(2, 'Apple Watch Series 9', 4000000, 12);

-- Insert sample transactions for user 1
INSERT INTO transactions (user_id, total_amount, payment_method) VALUES 
(1, 1050000, 'CASH'),
(1, 2500000, 'CARD'),
(1, 500000, 'TRANSFER');

-- Insert transaction items
INSERT INTO transaction_items (transaction_id, product_id, quantity, price_per_item) VALUES 
(1, 2, 1, 250000),
(1, 3, 1, 800000),
(2, 4, 1, 2500000),
(3, 5, 1, 500000);

-- Insert sample transactions for user 2
INSERT INTO transactions (user_id, total_amount, payment_method) VALUES 
(2, 15000000, 'CARD'),
(2, 8000000, 'TRANSFER');

INSERT INTO transaction_items (transaction_id, product_id, quantity, price_per_item) VALUES 
(4, 6, 1, 15000000),
(5, 7, 1, 8000000);

-- ============================================================
-- USEFUL QUERIES
-- ============================================================

-- Query untuk melihat semua data user
-- SELECT * FROM users;

-- Query untuk melihat semua produk milik user tertentu
-- SELECT * FROM products WHERE user_id = 1;

-- Query untuk melihat detail transaksi dengan item-itemnya
-- SELECT 
--   t.transaction_id,
--   t.total_amount,
--   t.payment_method,
--   t.created_at,
--   p.product_name,
--   ti.quantity,
--   ti.price_per_item
-- FROM transactions t
-- JOIN transaction_items ti ON t.transaction_id = ti.transaction_id
-- JOIN products p ON ti.product_id = p.product_id
-- WHERE t.user_id = 1
-- ORDER BY t.created_at DESC;

-- Query untuk melihat total penjualan per user
-- SELECT 
--   u.username,
--   COUNT(t.transaction_id) as total_transactions,
--   SUM(t.total_amount) as total_revenue,
--   COUNT(DISTINCT p.product_id) as total_products,
--   SUM(p.stock) as total_stock
-- FROM users u
-- LEFT JOIN transactions t ON u.id = t.user_id
-- LEFT JOIN products p ON u.id = p.user_id
-- GROUP BY u.id, u.username;

-- ============================================================
-- MIGRATION: Add barcode column to existing products table
-- Jalankan query ini jika database sudah ada sebelumnya
-- ============================================================
-- ALTER TABLE products ADD COLUMN barcode VARCHAR(100) DEFAULT NULL AFTER product_name;
-- ALTER TABLE products ADD INDEX idx_barcode (barcode);
