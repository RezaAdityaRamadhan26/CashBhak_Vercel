import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import AppToaster from "@/components/Toaster";
import { NotificationProvider } from "@/context/NotificationContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "CashBhak - Sistem Kasir Modern",
  description: "Kelola penjualan, inventori, dan laporan bisnis dengan mudah.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased font-sans`}
        style={{ background: "var(--gray-custom)" }}
      >
        <NotificationProvider>{children}</NotificationProvider>
        <AppToaster />
      </body>
    </html>
  );
}
