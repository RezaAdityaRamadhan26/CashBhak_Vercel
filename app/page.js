import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Zap,
  Users,
  Package,
  BarChart3,
  Shield,
  Clock,
  Check,
  ArrowRight,
  Star,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white text-[var(--black-custom)] scroll-smooth">
      {/* Navbar */}
      <header className="bg-white/80 backdrop-blur-md fixed w-full top-0 left-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            <span
              className="font-bold text-xl text-[var(--black-custom)]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              CashBhak
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-[var(--primary-custom)] transition-colors"
            >
              Fitur
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-[var(--primary-custom)] transition-colors"
            >
              Cara Kerja
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-gray-600 hover:text-[var(--primary-custom)] transition-colors"
            >
              Harga
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-gray-600 hover:text-[var(--primary-custom)] transition-colors"
            >
              Testimoni
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-[var(--primary-custom)] transition-colors hidden sm:block"
            >
              Masuk
            </Link>
            <Link href="/signup">
              <Button className="bg-[var(--primary-custom)] hover:bg-[var(--primary-custom)]/90 text-white font-medium px-5 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-[var(--primary-custom)]/20 hover:shadow-xl hover:shadow-[var(--primary-custom)]/30">
                Mulai Gratis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary-custom)]/10 rounded-full text-[var(--primary-custom)] text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Aplikasi Kasir Terbaik di Indonesia
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Kelola Bisnis{" "}
                <span className="text-[var(--primary-custom)] relative">
                  Lebih Cerdas
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    fill="none"
                  >
                    <path
                      d="M2 10C50 4 150 4 198 10"
                      stroke="var(--primary-custom)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.3"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Sistem Point of Sale modern yang membantu Anda mengelola
                transaksi, inventori, dan laporan bisnis dalam satu platform
                yang mudah digunakan.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/signup">
                  <Button className="bg-[var(--primary-custom)] hover:bg-[var(--primary-custom)]/90 text-white font-semibold px-8 py-6 rounded-xl text-base transition-all duration-300 shadow-lg shadow-[var(--primary-custom)]/30 hover:shadow-xl hover:shadow-[var(--primary-custom)]/40 hover:-translate-y-1">
                    Mulai Gratis Sekarang
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="border-2 border-gray-200 text-gray-700 font-semibold px-8 py-6 rounded-xl text-base hover:bg-gray-50 transition-all duration-300"
                >
                  Lihat Demo
                </Button>
              </div>

              <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary-custom)] to-[var(--blue-custom)] border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[var(--black-custom)]">
                    Dipercaya oleh
                  </p>
                  <p className="text-sm text-gray-500">
                    1000+ bisnis di Indonesia
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--primary-custom)]/20 to-[var(--blue-custom)]/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-2 border border-gray-100">
                <div className="bg-gray-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-xs text-gray-400 ml-2">
                      app.cashbhak.com
                    </span>
                  </div>
                  <Image
                    src="/images/hero.png"
                    alt="CashBhak Dashboard Preview"
                    width={600}
                    height={400}
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100 animate-float hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Transaksi Hari Ini</p>
                    <p className="font-bold text-[var(--primary-custom)]">
                      +Rp 2.5M
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100 animate-float-delayed hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Produk Terjual</p>
                    <p className="font-bold text-[var(--black-custom)]">
                      156 items
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-[var(--gray-custom)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Fitur Lengkap untuk{" "}
              <span className="text-[var(--primary-custom)]">
                Bisnis Modern
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk mengelola bisnis retail atau F&B
              dalam satu platform terintegrasi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Transaksi Cepat",
                description:
                  "Proses pembayaran dalam hitungan detik dengan antarmuka yang mudah digunakan.",
                color: "bg-yellow-100",
              },
              {
                icon: "👥",
                title: "Multi-User",
                description:
                  "Tambahkan kasir dan staff dengan role berbeda. Pantau aktivitas setiap pengguna.",
                color: "bg-blue-100",
              },
              {
                icon: "📦",
                title: "Manajemen Stok",
                description:
                  "Kelola inventori dengan mudah. Notifikasi otomatis saat stok menipis.",
                color: "bg-[var(--primary-custom)]/20",
              },
              {
                icon: "📊",
                title: "Laporan Realtime",
                description:
                  "Pantau performa bisnis Anda secara langsung dengan dashboard informatif.",
                color: "bg-purple-100",
              },
              {
                icon: "🛡️",
                title: "Aman & Terpercaya",
                description:
                  "Data bisnis dilindungi dengan enkripsi enterprise. Backup otomatis setiap hari.",
                color: "bg-green-100",
              },
              {
                icon: "🕐",
                title: "24/7 Support",
                description:
                  "Tim support kami siap membantu kapanpun Anda membutuhkan bantuan.",
                color: "bg-red-100",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 group"
              >
                <div
                  className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-2xl`}
                >
                  {feature.icon}
                </div>
                <h3
                  className="text-xl font-semibold mb-3 text-[var(--black-custom)]"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Mulai dalam{" "}
              <span className="text-[var(--primary-custom)]">3 Langkah</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Proses setup yang cepat dan mudah agar Anda bisa langsung fokus
              berjualan.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[var(--primary-custom)] to-[var(--blue-custom)]"></div>

            {[
              {
                step: "01",
                title: "Daftar Akun",
                desc: "Buat akun gratis dalam hitungan menit tanpa kartu kredit.",
              },
              {
                step: "02",
                title: "Setup Produk",
                desc: "Input produk dan atur harga dengan dashboard intuitif.",
              },
              {
                step: "03",
                title: "Mulai Berjualan",
                desc: "Langsung gunakan untuk transaksi bisnis Anda sehari-hari.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[var(--primary-custom)] to-[var(--blue-custom)] rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 shadow-lg shadow-[var(--primary-custom)]/30 relative z-10">
                  {item.step}
                </div>
                <h3
                  className="text-xl font-semibold mb-3 text-[var(--black-custom)]"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-[var(--primary-custom)] to-[var(--blue-custom)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Siap Tingkatkan Efisiensi Bisnis Anda?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Bergabung dengan ribuan bisnis lainnya yang sudah menggunakan
            CashBhak. Mulai gratis, tanpa kartu kredit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button className="bg-white text-[var(--primary-custom)] hover:bg-gray-100 font-semibold px-8 py-6 rounded-xl text-base transition-all duration-300 shadow-lg hover:shadow-xl">
                Mulai Gratis Sekarang
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 rounded-xl text-base transition-all duration-300"
            >
              Hubungi Sales
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 mt-10 text-white/80 text-sm flex-wrap">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Setup dalam 5 menit
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Tidak perlu kartu kredit
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Cancel kapan saja
            </span>
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-[var(--gray-custom)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Harga Transparan &{" "}
              <span className="text-[var(--primary-custom)]">Terjangkau</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pilih paket yang sesuai dengan kebutuhan bisnis Anda. Upgrade atau
              downgrade kapan saja.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Starter
                </h3>
                <p className="text-gray-500 text-sm">
                  Untuk bisnis kecil yang baru memulai
                </p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[var(--black-custom)]">
                  Gratis
                </span>
                <span className="text-gray-500 text-sm ml-2">selamanya</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "1 Kasir",
                  "100 Produk",
                  "Laporan Harian",
                  "Transaksi Unlimited",
                  "Support Email",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-[var(--primary-custom)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button
                  variant="outline"
                  className="w-full py-6 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  Mulai Gratis
                </Button>
              </Link>
            </div>

            {/* Pro Plan - Popular */}
            <div className="bg-gradient-to-br from-[var(--primary-custom)] to-[var(--blue-custom)] rounded-2xl p-8 shadow-xl relative transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1.5 rounded-full">
                Popular
              </div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Pro</h3>
                <p className="text-white/70 text-sm">
                  Untuk bisnis yang sedang berkembang
                </p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">Rp 199K</span>
                <span className="text-white/70 text-sm ml-2">/bulan</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "5 Kasir",
                  "Unlimited Produk",
                  "Laporan Lengkap",
                  "Multi-Cabang",
                  "Integrasi E-Commerce",
                  "Support Priority",
                  "Export Data",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white">
                    <Check className="w-5 h-5 text-white" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <Button className="w-full py-6 rounded-xl bg-white text-[var(--primary-custom)] font-semibold hover:bg-gray-100 transition-all duration-300">
                  Pilih Pro
                </Button>
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Enterprise
                </h3>
                <p className="text-gray-500 text-sm">
                  Untuk bisnis skala besar
                </p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[var(--black-custom)]">
                  Custom
                </span>
                <span className="text-gray-500 text-sm ml-2 block mt-1">
                  hubungi kami
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited Kasir",
                  "Unlimited Produk",
                  "Analitik Advanced",
                  "API Access",
                  "White Label",
                  "Dedicated Support",
                  "SLA 99.9%",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <Check className="w-5 h-5 text-[var(--primary-custom)]" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="w-full py-6 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                Hubungi Sales
              </Button>
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-10">
            Semua paket termasuk garansi uang kembali 14 hari. Tidak ada biaya
            tersembunyi.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className="text-3xl sm:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Dipercaya oleh{" "}
              <span className="text-[var(--primary-custom)]">
                Ribuan Bisnis
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dengar langsung dari pelanggan kami yang telah merasakan manfaat
              CashBhak.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Rina Susanti",
                role: "Pemilik Toko Kelontong",
                location: "Jakarta",
                quote:
                  "Sebelum pakai CashBhak, saya masih catat manual. Sekarang semua otomatis, laporan jelas, dan stock tercontrol dengan baik.",
              },
              {
                name: "Budi Hartono",
                role: "Owner Restoran",
                location: "Surabaya",
                quote:
                  "Pelayanan lebih cepat karena order langsung masuk ke dapur. Customer jadi lebih puas dan omset meningkat 30%.",
              },
              {
                name: "Dewi Lestari",
                role: "Manager Cafe",
                location: "Bandung",
                quote:
                  "Interface-nya user friendly banget, kasir baru cepat belajar. Report penjualan juga lengkap, jadi mudah analisa produk.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-[var(--gray-custom)] rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-custom)] to-[var(--blue-custom)] rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--black-custom)]">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/images/logo.png"
                  alt="CashBhak Logo"
                  width={40}
                  height={40}
                />
                <span
                  className="font-bold text-xl"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  CashBhak
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Solusi Point of Sale modern untuk membantu bisnis Anda
                berkembang dengan efisien dan cerdas.
              </p>
            </div>

            <div>
              <h4
                className="font-semibold mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Produk
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <a
                    href="#features"
                    className="hover:text-[var(--primary-custom)] transition-colors"
                  >
                    Fitur
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-[var(--primary-custom)] transition-colors"
                  >
                    Harga
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--primary-custom)] transition-colors"
                  >
                    Integrasi
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4
                className="font-semibold mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Sumber Daya
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--primary-custom)] transition-colors"
                  >
                    Dokumentasi
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--primary-custom)] transition-colors"
                  >
                    Panduan
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[var(--primary-custom)] transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4
                className="font-semibold mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Kontak
              </h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[var(--primary-custom)]" />
                  +62-896-545-0094
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[var(--primary-custom)]" />
                  support@cashbhak.com
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 CashBhak. Semua hak cipta dilindungi.
            </p>
            <div className="flex gap-6 text-gray-500 text-sm">
              <a
                href="#"
                className="hover:text-[var(--primary-custom)] transition-colors"
              >
                Privasi
              </a>
              <a
                href="#"
                className="hover:text-[var(--primary-custom)] transition-colors"
              >
                Ketentuan
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
