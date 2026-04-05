import connection from "@/lib/db";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Image from "next/image";

export default async function VerifyPage(props) {
  const searchParams = await props.searchParams;
  const token = searchParams?.token;
  let status = "loading";
  let message = "Memverifikasi akun Anda...";

  if (!token) {
    status = "error";
    message = "Tautan verifikasi tidak valid.";
  } else {
    try {
      // Cari user dengan token ini
      const [users] = await connection.execute(
        "SELECT * FROM users WHERE verification_token = ?",
        [token]
      );

      if (!users.length) {
        status = "error";
        message = "Token sudah digunakan atau tidak ditemukan.";
      } else {
        // Update status verifikasi dan hapus token
        await connection.execute(
          "UPDATE users SET is_verified = 1, verification_token = NULL WHERE verification_token = ?",
          [token]
        );
        status = "success";
        message = "Akun Anda telah berhasil diverifikasi!";
      }
    } catch (error) {
      status = "error";
      message = "Gagal memverifikasi. Silakan coba kembali nanti.";
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col items-center text-center p-10 relative">
        <Link href="/" className="mb-8 block">
          <Image src="/images/logo.png" alt="CashBhak Logo" width={64} height={64} className="mx-auto" />
        </Link>
        
        <div className="mb-6 flex justify-center">
          {status === "success" && (
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-500 animate-bounce">
              <CheckCircle2 size={48} strokeWidth={2.5} />
            </div>
          )}
          {status === "error" && (
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-500">
              <XCircle size={48} strokeWidth={2.5} />
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: "var(--font-poppins)" }}>
          {status === "success" ? "Verifikasi Berhasil" : "Verifikasi Gagal"}
        </h1>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          {message}
        </p>

        {status === "success" ? (
          <Link href="/login" className="w-full">
            <button className="w-full bg-[var(--primary-custom)] hover:bg-[var(--primary-custom)]/90 text-white font-semibold py-4 rounded-xl transition duration-300 shadow-lg shadow-[var(--primary-custom)]/30">
              Menuju Halaman Login
            </button>
          </Link>
        ) : (
          <Link href="/login" className="w-full">
            <button className="w-full border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 font-semibold py-4 rounded-xl transition duration-300">
              Kembali ke Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
