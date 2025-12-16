import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[var(--gray-custom)] text-[var(--black-custom)] scroll-smooth">
      {/* Navbar */}
      <header className="bg-[var(--light-custom)] fixed w-full top-0 left-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
            <div
              className="font-bold text-xl"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              CashBhak
            </div>
          </div>
          <nav className="hidden md:flex gap-4 text-sm font-medium absolute left-1/2 -translate-x-1/2">
            <a
              className="cursor-pointer"
              style={{
                fontFamily: "var(--font-poppins)",
                color: "var(--black-custom)",
              }}
              href="#hero"
            >
              Home
            </a>
            <a
              className="cursor-pointer"
              style={{
                fontFamily: "var(--font-poppins)",
                color: "var(--black-custom)",
              }}
              href="#fitur"
            >
              Features
            </a>
            <a
              className="cursor-pointer"
              style={{
                fontFamily: "var(--font-poppins)",
                color: "var(--black-custom)",
              }}
              href="#harga"
            >
              Pricing
            </a>
            <a
              className="cursor-pointer"
              style={{
                fontFamily: "var(--font-poppins)",
                color: "var(--black-custom)",
              }}
              href="#kontak"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-3">
            {/* --- PERUBAHAN DI SINI --- */}
            <Link
              href="/login"
              className="text-md font-normal"
              style={{
                fontFamily: "var(--font-poppins)",
                color: "var(--primary-custom)",
              }}
            >
              Sign In
            </Link>
            {/* --- DAN DI SINI --- */}
            <Link href="/signup">
              <Button
                className="bg-[var(--primary-custom)] text-[var(--light-custom)] font-normal text-md transition-all duration-200 hover:bg-gradient-to-r hover:from-[var(--primary-custom)] hover:to-[var(--blue-custom)] hover:text-[var(--light-custom)] cursor-pointer"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Spacer untuk fixed navbar */}
      <div className="pt-16">
        {/* Hero Section */}
        <section
          className="w-full h-[500px] relative flex items-center"
          id="hero"
        >
          <img
            src="/images/hero.png"
            alt="Sistem Kasir"
            className="w-full h-full object-cover absolute inset-0 z-0"
          />
          <div className="absolute inset-0 z-1"></div>
          <div className="relative z-10 max-w-2xl px-8 md:px-16">
            <h1
              className="font-bold text-4xl md:text-5xl leading-tight mb-4"
              style={{
                fontFamily: "var(--font-poppins)",
                color: "var(--black-custom)",
              }}
            >
              Sistem Kasir Modern Untuk Bisnis Anda
            </h1>
            <p
              className="text-md mb-8"
              style={{ color: "var(--black-custom)", opacity: 0.7 }}
            >
              Kelola penjualan, inventori, dan laporan bisnis dengan mudah
              menggunakan sistem kasir terpercaya yang telah digunakan ribuan
              merchant di indonesia.
            </p>
            <div className="flex gap-4">
              <Button className="bg-[var(--primary-custom)] text-[var(--light-custom)] font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-[var(--primary-custom)] hover:to-[var(--blue-custom)] cursor-pointer">
                Try Free Trial 30 Days
              </Button>
              {/* --- DAN DI SINI --- */}
              <Link href="/signup">
                <Button className="bg-[var(--gray-custom)] text-[var(--black-custom)] font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-[var(--primary-custom)] hover:to-[var(--blue-custom)] hover:text-[var(--light-custom)] cursor-pointer">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ... sisa kode landing page Anda ... */}
        {/* (Saya potong agar ringkas, tapi sisa file Anda tetap sama) */}
      </div>

      {/* Features Section */}
      <section className="py-16 sm:py-20" id="fitur">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="font-bold text-3xl md:text-4xl text-center mb-12"
            style={{
              fontFamily: "var(--font-poppins)",
              color: "var(--black-custom)",
            }}
          >
            Features We Provide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Point Of Sales */}
            <div className="bg-[var(--light-custom)] rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/left-landingpage.png"
                alt="Point Of Sales"
                width={600}
                height={400}
                className="w-full h-52 object-cover"
              />
              <div className="p-6 flex-1">
                <h3
                  className="font-semibold text-xl mb-3"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    color: "var(--primary-custom)",
                  }}
                >
                  Point Of Sales
                </h3>
                <p
                  className="text-[var(--black-custom)] text-sm leading-relaxed"
                  style={{ opacity: 0.7 }}
                >
                  Fitur POS (Point of Sales), proses penjualan di toko dapat
                  dikelola dengan lebih cepat dan akurat, sehingga dapat
                  mengurangi kesalahan dalam proses penjualan
                </p>
              </div>
            </div>
            {/* Card 2: Manajemen Stok */}
            <div className="bg-[var(--light-custom)] rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/mid-landingpage.png"
                alt="Manajemen Stok Barang"
                width={600}
                height={400}
                className="w-full h-52 object-cover"
              />
              <div className="p-6 flex-1">
                <h3
                  className="font-semibold text-xl mb-3"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    color: "var(--primary-custom)",
                  }}
                >
                  Manajemen Stok Barang (Inventory)
                </h3>
                <p
                  className="text-[var(--black-custom)] text-sm leading-relaxed"
                  style={{ opacity: 0.7 }}
                >
                  Atur dan monitoring pengelolaan stok barang yang tersedia di
                  sistem dan gudang secara akurat
                </p>
              </div>
            </div>
            {/* Card 3: Laporan Usaha */}
            <div className="bg-[var(--light-custom)] rounded-xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/right-landingpage.png"
                alt="Laporan Usaha Lengkap"
                width={600}
                height={400}
                className="w-full h-52 object-cover"
              />
              <div className="p-6 flex-1">
                <h3
                  className="font-semibold text-xl mb-3"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    color: "var(--primary-custom)",
                  }}
                >
                  Laporan Usaha Lengkap
                </h3>
                <p
                  className="text-[var(--black-custom)] text-sm leading-relaxed"
                  style={{ opacity: 0.7 }}
                >
                  Nikmati akses laporan usaha lengkap dari aplikasi kasir pintar
                  dimana saja dan kapan saja
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Big Text*/}
      <section>
        <div className="bg-[var(--primary-custom)] p-12 shadow-md flex flex-col items-center justify-center text-center">
          <h1
            className="font-bold text-3xl mb-3 flex items-center justify-center"
            style={{
              color: "var(--light-custom)",
              fontFamily: "var(--font-poppins)",
            }}
          >
            Ready To Improve Your Business?
          </h1>
          <p
            className="text-[var(--light-custom)] text-md leading-relaxed"
            style={{ opacity: 0.8 }}
          >
            Join thousands of merchants who have trusted KasirPro to manage
            their business.
          </p>
          {/* --- DAN DI SINI --- */}
          <Link href="/signup">
            <Button
              className="mt-6 bg-[var(--light-custom)] text-[var(--primary-custom)] font-semibold py-3 px-6 rounded-lg transition-all duration-200 hover:bg-gradient-to-r hover:from-[var(--primary-custom)] hover:to-[var(--blue-custom)] hover:text-[var(--light-custom)] cursor-pointer"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Register Now
            </Button>
          </Link>
        </div>
      </section>
      {/* Offering Card Section */}
      <section
        className="py-10 sm:py-14 bg-[var(--gray-custom)] overflow-hidden"
        id="harga"
      >
        <div className="max-w-6xl mx-auto px-4 mb-8">
          <h2
            className="font-bold text-2xl md:text-3xl text-center mb-12"
            style={{
              fontFamily: "var(--font-poppins)",
              color: "var(--black-custom)",
            }}
          >
            Choose The Best Plan For Your Business
          </h2>
          <div className="flex flex-col lg:flex-row items-center justify-center py-8">
            {/* Card 1 */}
            <div className="w-full max-w-xs bg-[var(--light-custom)] rounded-xl shadow-lg p-5 hover:scale-105 transition-transform duration-400 min-h-[370px] flex flex-col justify-between">
              <div className="text-left">
                <span className="bg-[var(--primary-custom)] text-[var(--light-custom)] text-xs font-semibold px-3 py-3 rounded-lg">
                  3 Months Subscription
                </span>
                <h3
                  className="text-2xl font-bold mt-4"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    color: "var(--black-custom)",
                  }}
                >
                  IDR 300.000
                </h3>
                <p
                  className="text-xs"
                  style={{ opacity: 0.8, color: "var(--black-custom)" }}
                >
                  *before tax
                </p>
              </div>
              <p
                className="text-[var(--black-custom)] text-xs mt-2 text-left"
                style={{ opacity: 0.7 }}
              >
                Three Month Subsciption. For your better use in short time. Get
                better experience on 6 months subscription
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2">
                  <Image
                    src="/images/check.png"
                    alt="Check"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span
                    className="text-[var(--black-custom)] text-xs"
                    style={{ opacity: 0.8 }}
                  >
                    Customer Service Fast Response
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Image
                    src="/images/check.png"
                    alt="Check"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span
                    className="text-[var(--black-custom)] text-xs"
                    style={{ opacity: 0.8 }}
                  >
                    Add items whatever you want
                  </span>
                </li>
              </ul>
              <button
                className="w-full text-[var(--light-custom)] font-semibold py-2 px-4 rounded-lg mt-5 bg-gradient-to-r from-[var(--primary-custom)] to-[var(--blue-custom)] transition-all duration-200 hover:from-emerald-400 hover:to-[var(--blue-custom)] cursor-pointer"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Get Started Now!
              </button>
            </div>
            {/* Card 2 */}
            <div className="w-full max-w-sm bg-gradient-to-b from-[var(--primary-custom)] to-[var(--blue-custom)] rounded-xl shadow-2xl p-5 text-[var(--light-custom)] relative z-10 lg:scale-105 transition-transform duration-200 min-h-[430px] flex flex-col justify-between lg:-mt-8">
              <div className="text-left">
                <span className="bg-[var(--blue-custom)] text-[var(--light-custom)] text-xs font-semibold px-3 py-3 rounded-lg">
                  6 Months Subscription
                </span>
                <h3
                  className="text-2xl font-bold mt-4"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Free For 60 Days
                </h3>
                <p
                  className="text-xs"
                  style={{
                    color: "var(--light-custom)",
                    opacity: 0.9,
                    marginTop: "0.5rem",
                  }}
                >
                  Get free experience for 60 days, use some benefits that can
                  you get. Next subscription will be paid constantly
                </p>
              </div>
              <ul className="mt-5 space-y-2">
                <li className="flex items-center gap-2">
                  <Image
                    src="/images/cross.png"
                    alt="Cross"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span
                    className="text-[var(--light-custom)] text-xs"
                    style={{ opacity: 0.8 }}
                  >
                    Customer Service Fast Response
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Image
                    src="/images/cross.png"
                    alt="Cross"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span
                    className="text-[var(--light-custom)] text-xs"
                    style={{ opacity: 0.8 }}
                  >
                    Add items whatever you want
                  </span>
                </li>
              </ul>
              <button
                className="w-full text-[var(--primary-custom)] bg-[var(--light-custom)] font-semibold py-2 px-4 rounded-lg mt-5 transition-all duration-200 hover:bg-gradient-to-r hover:from-[var(--primary-custom)] hover:to-[var(--blue-custom)] hover:text-[var(--light-custom)] cursor-pointer"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Try Free Now!
              </button>
            </div>
            {/* Card 3 */}
            <div className="w-full max-w-xs bg-[var(--light-custom)] rounded-xl shadow-lg p-5 hover:scale-105 transition-transform duration-200 min-h-[370px] flex flex-col justify-between">
              <div className="text-left">
                <span className="bg-[var(--primary-custom)] text-[var(--light-custom)] text-xs font-semibold px-3 py-3 rounded-lg">
                  6 Months Subscription
                </span>
                <h3
                  className="text-2xl font-bold mt-4"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    color: "var(--black-custom)",
                  }}
                >
                  IDR 600.000
                </h3>
                <p
                  className="text-xs"
                  style={{ opacity: 0.8, color: "var(--black-custom)" }}
                >
                  *before tax
                </p>
              </div>
              <p
                className="text-[var(--black-custom)] text-xs mt-4 text-left"
                style={{ opacity: 0.7 }}
              >
                Three Month Subsciption. For your better use in short time. Get
                better experience on 6 months subscription
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center gap-2">
                  <Image
                    src="/images/check.png"
                    alt="Check"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span
                    className="text-[var(--black-custom)] text-xs"
                    style={{ opacity: 0.8 }}
                  >
                    Customer Service Fast Response
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Image
                    src="/images/check.png"
                    alt="Check"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                  <span
                    className="text-[var(--black-custom)] text-xs"
                    style={{ opacity: 0.8 }}
                  >
                    Add items whatever you want
                  </span>
                </li>
              </ul>
              <button
                className="w-full text-[var(--light-custom)] font-semibold py-2 px-4 rounded-lg mt-5 bg-gradient-to-r from-[var(--primary-custom)] to-[var(--blue-custom)] transition-all duration-200 hover:from-emerald-400 hover:to-[var(--blue-custom)] cursor-pointer"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Get Started Now!
              </button>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-[#1B8C7E] text-white pt-10 pb-4 mt-8" id="kontak">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row md:justify-between gap-8">
          {/* Logo & Desc */}
          <div className="flex flex-col min-w-[180px]">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src="/images/logo.png"
                alt="CashBhak Logo"
                width={44}
                height={44}
              />
              <span
                className="font-semibold text-2xl"
                style={{
                  color: "var(--light-custom)",
                  fontFamily: "var(--font-poppins)",
                }}
              >
                CashBhak
              </span>
            </div>
            <div className="text-sm opacity-80">
              The leading cashier solution for modern businesses in Indonesia.
            </div>
          </div>
          {/* Product */}
          <div className="flex-1 min-w-[120px]">
            <div
              className="font-semibold mb-2"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Product
            </div>
            <ul className="space-y-1 text-sm opacity-90">
              <li>Cashier System</li>
              <li>Stock Management</li>
              <li>Business Report</li>
            </ul>
          </div>
          {/* Support */}
          <div className="flex-1 min-w-[120px]">
            <div
              className="font-semibold mb-2"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Support
            </div>
            <ul className="space-y-1 text-sm opacity-90">
              <li>Call Center</li>
              <li>Tutorial</li>
              <li>Contact</li>
            </ul>
          </div>
          {/* Contact */}
          <div className="flex-1 min-w-[180px]">
            <div
              className="font-semibold mb-2"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Contact
            </div>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center gap-2">
                {/* Phone Image */}
                <Image
                  src="/images/phone.png"
                  alt="Phone"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                +62-896-545-0094
              </li>
              <li className="flex items-center gap-2">
                {/* Mail Image */}
                <Image
                  src="/images/mail.png"
                  alt="Mail"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                eki@gmail.com
              </li>
            </ul>
          </div>
        </div>
        <hr className="border-t border-white border-opacity-15 my-6 mx-12" />
        <div
          className="text-center text-xs opacity-70"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          © 2025 WebKasir. All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}
