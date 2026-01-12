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
  User,
  Menu,
  X,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import Logout from '@/components/log-out';

// Navigation items
const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Transaction', href: '/transaction', icon: ArrowLeftRight },
  { name: 'Items Data', href: '/items', icon: Package },
];

const utilItems = [
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Help & Support', href: '/help', icon: HelpCircle },
];

// Navigation Links Component - Declared outside component to avoid re-creation
const NavLinks = ({ pathname, onClose, isExpanded }) => (
  <>
    {navItems.map((item) => {
      const isActive = pathname === item.href;
      return (
        <Link
          key={item.name}
          href={item.href}
          onClick={onClose}
          className={`flex items-center gap-3 rounded-lg p-3 transition-colors whitespace-nowrap ${isActive
            ? 'bg-[var(--gray-custom)] text-[var(--black-custom)] font-semibold'
            : 'text-[var(--black-custom)] hover:bg-[var(--gray-custom)]'
            }`}
          style={{ fontFamily: 'var(--font-poppins)' }}
          title={!isExpanded ? item.name : ''}
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          {isExpanded && <span className="text-sm">{item.name}</span>}
        </Link>
      );
    })}
  </>
);

// Utility Links Component - Declared outside component to avoid re-creation
const UtilLinks = ({ pathname, onClose, isExpanded }) => (
  <>
    {utilItems.map((item) => {
      const isActive = pathname === item.href;
      return (
        <Link
          key={item.name}
          href={item.href}
          onClick={onClose}
          className={`flex items-center gap-3 rounded-lg p-3 transition-colors whitespace-nowrap ${isActive
            ? 'bg-[var(--gray-custom)] text-[var(--black-custom)] font-semibold'
            : 'text-[var(--black-custom)] hover:bg-[var(--gray-custom)]'
            }`}
          style={{ fontFamily: 'var(--font-poppins)' }}
          title={!isExpanded ? item.name : ''}
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          {isExpanded && <span className="text-sm">{item.name}</span>}
        </Link>
      );
    })}
  </>
);

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
  const handleClose = () => setIsOpen(false);
  const toggleDesktopSidebar = () => setIsDesktopExpanded(!isDesktopExpanded);

  return (
    <>
      {/* Desktop Sidebar - Toggle Expand/Collapse */}
      <aside
        className={`hidden md:flex relative h-screen flex-col justify-between p-2 md:p-4 pt-4 md:pt-6 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isDesktopExpanded ? 'w-64' : 'w-20'
          }`}
        style={{ backgroundColor: 'var(--light-custom)' }}
      >
        <div>
          {/* Sidebar Header with Toggle */}
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-3">
              <Image src="/images/logo.png" alt="Logo" width={32} height={32} className="flex-shrink-0" />
              {isDesktopExpanded && (
                <span
                  className="text-xl font-bold text-[var(--black-custom)] inline whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-poppins)' }}
                >
                  CashBhak
                </span>
              )}
            </div>
            <button
              onClick={toggleDesktopSidebar}
              className="p-1 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
              aria-label="Toggle sidebar"
              title={isDesktopExpanded ? 'Collapse' : 'Expand'}
            >
              {isDesktopExpanded ? (
                <ChevronLeft className="h-5 w-5 text-[var(--black-custom)]" />
              ) : (
                <ChevronRight className="h-5 w-5 text-[var(--black-custom)]" />
              )}
            </button>
          </div>

          {/* Navigasi Utama */}
          <nav className="flex flex-col gap-2">
            <NavLinks pathname={pathname} onClose={handleClose} isExpanded={isDesktopExpanded} />
          </nav>

          {isDesktopExpanded && <hr className="my-4 border-[var(--gray-custom)]" />}

          {/* Navigasi Bantuan & Setting */}
          <nav className="flex flex-col gap-2">
            <UtilLinks pathname={pathname} onClose={handleClose} isExpanded={isDesktopExpanded} />
          </nav>
        </div>

        {/* Tombol Logout */}
        <div className={`transition-opacity duration-300 ${isDesktopExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <Logout />
        </div>
      </aside>

      {/* Mobile Hamburger Menu - Fixed Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Image src="/images/logo.png" alt="Logo" width={32} height={32} />
          <span
            className="font-bold text-[var(--black-custom)]"
            style={{ fontFamily: 'var(--font-poppins)' }}
          >
            CashBhak
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <span className={`inline-flex transition-transform duration-300 ${isOpen ? 'rotate-90 scale-95' : 'rotate-0 scale-100'}`}>
            {isOpen ? (
              <X className="h-6 w-6 text-[var(--black-custom)]" />
            ) : (
              <Menu className="h-6 w-6 text-[var(--black-custom)]" />
            )}
          </span>
        </button>
      </div>

      {/* Mobile Menu Drawer (animated) */}
      <div className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Overlay Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'}`}
          onClick={handleClose}
        />

        {/* Drawer Menu */}
        <div
          className={`absolute left-0 top-0 h-full w-64 shadow-lg flex flex-col justify-between p-4 pt-20 overflow-y-auto transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
          style={{ backgroundColor: 'var(--light-custom)' }}
        >
          <div>
            {/* Navigasi Utama */}
            <nav className="flex flex-col gap-2 mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase px-3 mb-2">Menu</h3>
              <NavLinks pathname={pathname} onClose={handleClose} />
            </nav>

            <hr className="my-2 border-[var(--gray-custom)]" />

            {/* Navigasi Bantuan */}
            <nav className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase px-3 mb-2">Settings</h3>
              <UtilLinks pathname={pathname} onClose={handleClose} />
            </nav>
          </div>

          {/* Logout Button */}
          <div>
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
