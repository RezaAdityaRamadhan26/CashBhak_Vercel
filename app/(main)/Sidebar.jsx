"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  ArrowLeftRight,
  Package,
  User,
  Menu,
  X,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import Logout from '@/components/log-out';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Transaksi', href: '/transaction', icon: ArrowLeftRight },
  { name: 'Produk', href: '/items', icon: Package },
];

const utilItems = [
  { name: 'Profil', href: '/profile', icon: User },
];

const NavLinks = ({ pathname, onClose, isExpanded }) => (
  <>
    {navItems.map((item) => {
      const isActive = pathname === item.href;
      return (
        <Link
          key={item.name}
          href={item.href}
          onClick={onClose}
          className={`flex items-center gap-3 rounded-xl p-3 transition-all duration-200 group ${isActive
            ? 'bg-[var(--primary-custom)] text-white shadow-lg shadow-[var(--primary-custom)]/30'
            : 'text-gray-600 hover:bg-gray-100'
            }`}
          title={!isExpanded ? item.name : ''}
        >
          <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${!isActive && 'group-hover:scale-110'}`} />
          {isExpanded && <span className="text-sm font-medium">{item.name}</span>}
        </Link>
      );
    })}
  </>
);

const UtilLinks = ({ pathname, onClose, isExpanded }) => (
  <>
    {utilItems.map((item) => {
      const isActive = pathname === item.href;
      return (
        <Link
          key={item.name}
          href={item.href}
          onClick={onClose}
          className={`flex items-center gap-3 rounded-xl p-3 transition-all duration-200 group ${isActive
            ? 'bg-[var(--primary-custom)] text-white shadow-lg shadow-[var(--primary-custom)]/30'
            : 'text-gray-600 hover:bg-gray-100'
            }`}
          title={!isExpanded ? item.name : ''}
        >
          <item.icon className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${!isActive && 'group-hover:scale-110'}`} />
          {isExpanded && <span className="text-sm font-medium">{item.name}</span>}
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
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex relative h-screen flex-col justify-between p-4 pt-6 transition-all duration-300 ease-in-out overflow-hidden border-r border-gray-100 ${isDesktopExpanded ? 'w-64' : 'w-20'
          }`}
        style={{ backgroundColor: 'white' }}
      >
        <div>
          {/* Header */}
          <div className={`flex items-center mb-8 ${isDesktopExpanded ? 'justify-between px-1' : 'flex-col gap-3'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <Image src="/images/logo.png" alt="Logo" width={36} height={36} className="flex-shrink-0" />
              </div>
              {isDesktopExpanded && (
                <span className="text-xl font-bold text-[var(--black-custom)]" style={{ fontFamily: 'var(--font-poppins)' }}>
                  CashBhak
                </span>
              )}
            </div>
            <button
              onClick={toggleDesktopSidebar}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0"
              aria-label="Toggle sidebar"
            >
              {isDesktopExpanded ? (
                <ChevronLeft className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Menu Label */}
          {isDesktopExpanded && (
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Menu</p>
          )}

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            <NavLinks pathname={pathname} onClose={handleClose} isExpanded={isDesktopExpanded} />
          </nav>

          {isDesktopExpanded && <div className="my-6 border-t border-gray-100"></div>}

          {/* Settings Label */}
          {isDesktopExpanded && (
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Pengaturan</p>
          )}

          {/* Utility Links */}
          <nav className="flex flex-col gap-2">
            <UtilLinks pathname={pathname} onClose={handleClose} isExpanded={isDesktopExpanded} />
          </nav>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-100 pt-4">
          <Logout isExpanded={isDesktopExpanded} />
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image src="/images/logo.png" alt="Logo" width={32} height={32} />
          </div>
          <span className="font-bold text-[var(--black-custom)]" style={{ fontFamily: 'var(--font-poppins)' }}>
            CashBhak
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleClose}
        />
        <div
          className={`absolute left-0 top-0 h-full w-72 bg-white shadow-2xl flex flex-col justify-between p-4 pt-20 overflow-y-auto transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Menu</p>
            <nav className="flex flex-col gap-2 mb-6">
              <NavLinks pathname={pathname} onClose={handleClose} isExpanded={true} />
            </nav>

            <div className="my-4 border-t border-gray-100"></div>

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">Pengaturan</p>
            <nav className="flex flex-col gap-2">
              <UtilLinks pathname={pathname} onClose={handleClose} isExpanded={true} />
            </nav>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
