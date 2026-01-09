"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Package,
  HelpCircle,
  Settings,
  LogOut,
  User // 1. Import ikon User
} from 'lucide-react';
import Logout from '@/components/log-out';

// Definisikan item navigasi
const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Transaction', href: '/transaction', icon: ArrowLeftRight },
  { name: 'Items Data', href: '/items', icon: Package },
];

// 2. Tambahkan link Profile di sini
const utilItems = [
  { name: 'Profile', href: '/profile', icon: User }, // <-- BARU
  { name: 'Help & Support', href: '/help', icon: HelpCircle },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:flex relative h-screen w-16 md:w-20 flex-col justify-between p-2 md:p-4 pt-4 md:pt-6 shadow-lg transition-all duration-300 ease-in-out hover:w-60 group"
      style={{ backgroundColor: 'var(--light-custom)' }}
    >
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-6 pl-1">
          <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="flex-shrink-0" />
          <span
            className="text-xl font-bold text-[var(--black-custom)] hidden group-hover:inline"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            CashBhak
          </span>
        </div>

        {/* Navigasi Utama */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg p-3 ${isActive
                  ? 'bg-[var(--gray-custom)] text-[var(--black-custom)] font-semibold'
                  : 'text-[var(--black-custom)] hover:bg-[var(--gray-custom)]'
                  }`}
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="hidden group-hover:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <hr className="my-4 border-[var(--gray-custom)]" />

        {/* Navigasi Bantuan & Setting (sekarang ada Profile) */}
        <nav className="flex flex-col gap-2">
          {utilItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                // (DIUBAH) Ditambahkan pengecekan 'isActive' di sini juga
                className={`flex items-center gap-3 rounded-lg p-3 ${isActive
                  ? 'bg-[var(--gray-custom)] text-[var(--black-custom)] font-semibold'
                  : 'text-[var(--black-custom)] hover:bg-[var(--gray-custom)]'
                  }`}
                style={{ fontFamily: 'var(--font-poppins)' }}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="hidden group-hover:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Tombol Logout */}
      <div>

        <Logout></Logout>
      </div>
    </aside>
  );
};

export default Sidebar;