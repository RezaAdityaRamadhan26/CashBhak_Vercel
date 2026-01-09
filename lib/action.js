"use server";

import connection from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function register(formData) {
  try {
    const username = formData.get("username");
    const email = formData.get("email");
    const password1 = formData.get("password1");
    const password2 = formData.get("password2");

    // Validasi input
    if (!username || !email || !password1 || !password2) {
      console.error("register gagal: ada field yang kosong", {
        username: !!username,
        email: !!email,
        password1: !!password1,
        password2: !!password2,
      });
      throw new Error("Semua field harus diisi");
    }

    if (password1 !== password2) {
      console.error("register gagal: password tidak sama");
      throw new Error("Password tidak cocok");
    }

    console.log("Attempting to register user:", {
      username,
      email,
      passwordLength: password1.length,
    });

    // Insert ke database
    const result = await connection.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password1]
    );

    console.log("User registered successfully:", {
      insertId: result[0].insertId,
      email,
    });

    redirect("/login");
  } catch (error) {
    console.error("Register error:", error.message);
    console.error("Full error:", error);
    throw error; // Re-throw untuk ditangkap di level yang lebih tinggi
  }
}

export async function findUserByEmail(email) {
  const [user] = await connection.execute(
    "select * from users where email = ?",
    [email]
  );

  if (!user.length) return null;

  return user[0];
}

export async function fetchItems() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const userId = user.id;

  const [items] = await connection.query(
    `
        SELECT * FROM products
        WHERE user_id = ?;
    `,
    [userId]
  );

  return items;
}

export async function pushProduct(formData) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user || !user.id) {
      throw new Error("User not authenticated");
    }

    const userId = user.id;
    const product_name = formData.get("product_name");
    const price = formData.get("price");
    const stock = formData.get("stock");
    const product_image = formData.get("product_image");

    console.log("Adding product:", {
      userId,
      product_name,
      price,
      stock,
      product_image,
    });

    const [result] = await connection.execute(
      `INSERT INTO products (user_id, product_name, price, stock, product_image)
       VALUES (?, ?, ?, ?, ?)`,
      [userId, product_name, price, stock || 0, product_image]
    );

    console.log("Product added successfully:", result.insertId);
    revalidatePath("/items");

    return { success: true, productId: result.insertId };
  } catch (error) {
    console.error("Error in pushProduct:", error);
    throw error;
  }
}

export async function deleteData(formData) {
  const id = formData.get("id");

  await connection.execute(`DELETE FROM products WHERE product_id = ?`, [id]);

  revalidatePath("/items");
}

export async function updateProduct(formData) {
  try {
    const product_id = formData.get("product_id");
    const product_name = formData.get("product_name");
    const price = formData.get("price");
    const stock = formData.get("stock");
    const product_image = formData.get("product_image");

    console.log("Updating product:", {
      product_id,
      product_name,
      price,
      stock,
      product_image,
    });

    const [result] = await connection.execute(
      `UPDATE products 
       SET product_name = ?, price = ?, stock = ?, product_image = ? 
       WHERE product_id = ?`,
      [product_name, price, stock, product_image, product_id]
    );

    console.log("Product updated successfully:", result.affectedRows, "rows");
    revalidatePath("/items");

    return { success: true };
  } catch (error) {
    console.error("Error in updateProduct:", error);
    throw error;
  }
}

export async function updateName(formData) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const userId = user.id;
  const newName = formData.get("name");

  await connection.execute(
    `UPDATE users 
     SET username = ? 
     WHERE id = ?`,
    [newName, userId]
  );

  revalidatePath("/profile");
}

export async function updateEmail(formData) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const userId = user.id;
  const newEmail = formData.get("email");
  await connection.execute(
    `UPDATE users 
     SET email = ? 
     WHERE id = ?`,
    [newEmail, userId]
  );
  revalidatePath("/profile");
}

export async function updatePassword(formData) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const userId = user.id;
  const newPassword = formData.get("password");
  await connection.execute(
    `UPDATE users 
     SET password = ? 
     WHERE id = ?`,
    [newPassword, userId]
  );
  revalidatePath("/profile");
}

export async function fetchUserData() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const userId = user.id;
  const [userData] = await connection.query(
    `
        SELECT * FROM users
        WHERE id = ?;
    `,
    [userId]
  );
  return userData[0];
}

export async function UpdateAvatar(formData) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const userId = user.id;
  const profile_image = formData.get("profile_image");
  await connection.execute(
    `UPDATE users
     SET profile_image = ?
     WHERE id = ?`,
    [profile_image, userId]
  );
  revalidatePath("/profile");
}

export async function createTransaction(cart, paymentMethod) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return { error: "User tidak terautentikasi." };
  }
  const userId = user.id;

  // Dapatkan koneksi dari pool
  let conn;
  try {
    conn = await connection.getConnection();
    await conn.beginTransaction();

    // 1. Hitung total amount di server untuk keamanan
    const totalAmount = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // 2. Masukkan ke tabel 'transactions'
    const [transactionResult] = await conn.execute(
      `INSERT INTO transactions (user_id, total_amount, payment_method) VALUES (?, ?, ?)`,
      [userId, totalAmount, paymentMethod]
    );
    const transactionId = transactionResult.insertId;

    if (!transactionId) {
      throw new Error("Gagal membuat transaksi.");
    }

    // 3. Masukkan setiap item ke 'transaction_items' dan kurangi stok
    for (const item of cart) {
      // Masukkan ke transaction_items
      await conn.execute(
        `INSERT INTO transaction_items (transaction_id, product_id, quantity, price_per_item) VALUES (?, ?, ?, ?)`,
        [transactionId, item.product_id, item.quantity, item.price]
      );

      // Kurangi stok di products
      await conn.execute(
        `UPDATE products SET stock = stock - ? WHERE product_id = ? AND user_id = ?`,
        [item.quantity, item.product_id, userId]
      );
    }

    // 4. Jika semua berhasil, commit transaksi
    await conn.commit();

    // 5. Revalidasi path agar data di halaman lain (spt dashboard) terupdate
    revalidatePath("/dashboard");
    revalidatePath("/transaction");

    // 6. Kembalikan pesan sukses
    return { success: true, transactionId: transactionId };
  } catch (error) {
    // 7. Jika ada error, batalkan semua perubahan (rollback)
    if (conn) await conn.rollback();
    console.error("Gagal memproses transaksi:", error);
    return { error: error.message };
  } finally {
    // 8. Selalu lepaskan koneksi kembali ke pool
    if (conn) conn.release();
  }
}

export async function fetchTransactionsForDashboard() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    console.log(
      "Sesi user tidak ditemukan untuk fetchTransactionsForDashboard"
    );
    return [];
  }
  const userId = user.id;

  try {
    // Query diperbarui menggunakan ROW_NUMBER() untuk ID urut
    const [rows] = await connection.query(
      `
        SELECT 
          ROW_NUMBER() OVER (ORDER BY t.created_at ASC) as id,
          p.product_name as name,
          ti.quantity as qty,
          (ti.quantity * ti.price_per_item) as amount,
          t.payment_method as sales,
          t.created_at as date
        FROM 
          transaction_items ti
        JOIN 
          transactions t ON ti.transaction_id = t.transaction_id
        JOIN 
          products p ON ti.product_id = p.product_id
        WHERE 
          t.user_id = ?
        ORDER BY 
          t.created_at DESC;
      `,
      [userId]
    );

    return rows;
  } catch (error) {
    console.error("Gagal mengambil data transaksi dashboard:", error);
    return [];
  }
}
