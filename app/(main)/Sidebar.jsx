"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Package,
  HelpCircle,
  Settings,
  LogOut,
  User,
  Menu,
  X
} from 'lucide-react';
import Logout from '@/components/log-out';

// Definisikan item navigasi
const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Transaction', href: '/transaction', icon: ArrowLeftRight },
  { name: 'Items Data', href: '/items', icon: Package },
];

// Tambahkan link Profile di sini
const utilItems = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Help & Support', href: '/help', icon: HelpCircle },
];

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Navigation Links Component
  const NavLinks = () => (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${isActive
              ? 'bg-[var(--gray-custom)] text-[var(--black-custom)] font-semibold'
              : 'text-[var(--black-custom)] hover:bg-[var(--gray-custom)]'
              }`}
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </>
  );

  // Utility Links Component
  const UtilLinks = () => (
    <>
      {utilItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${isActive
              ? 'bg-[var(--gray-custom)] text-[var(--black-custom)] font-semibold'
              : 'text-[var(--black-custom)] hover:bg-[var(--gray-custom)]'
              }`}
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <>
      {/* Desktop Sidebar - Hover Expand */}
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
            <NavLinks />
          </nav>

          <hr className="my-4 border-[var(--gray-custom)]" />

          {/* Navigasi Bantuan & Setting */}
          <nav className="flex flex-col gap-2">
            <UtilLinks />
          </nav>
        </div>

        {/* Tombol Logout */}
        <div>
          <Logout></Logout>
        </div>
      </aside>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Logo" width={32} height={32} />
          <span className="font-bold text-[var(--black-custom)]">CashBhak</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setIsOpen(false)}>
          <div
            className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg flex flex-col justify-between p-4 pt-20"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: 'var(--light-custom)' }}
          >
            <div>
              {/* Navigasi Utama */}
              <nav className="flex flex-col gap-2 mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase px-3 mb-2">Menu</h3>
                <NavLinks />
              </nav>

              <hr className="my-2 border-[var(--gray-custom)]" />

              {/* Navigasi Bantuan */}
              <nav className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase px-3 mb-2">Settings</h3>
                <UtilLinks />
              </nav>
            </div>

            {/* Logout Button */}
            <div>
              <Logout></Logout>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
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

{/* Tombol Logout */ }
<div>

  <Logout></Logout>
</div>
    </aside >
  );
};

export default Sidebar;