"use client";

import { Bell, Search } from 'lucide-react';
import Link from 'next/link';
import { fetchUserData } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useNotifications } from '@/context/NotificationContext';

export default function Topbar() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { unreadCount } = useNotifications();

  useEffect(() => {
    async function getData() {
      const data = await fetchUserData();
      setUserData(data);
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) {
    return (
      <header className="hidden md:flex justify-between items-center p-4 bg-white rounded-2xl mb-6 border border-gray-100">
        <div className="flex-1">
          <div className="h-5 w-48 bg-gray-100 rounded-lg animate-pulse"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-gray-100 rounded-xl animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="rounded-full w-10 h-10 bg-gray-100 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-3 w-16 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="hidden md:flex justify-between items-center p-4 bg-white rounded-2xl mb-6 border border-gray-100">
      {/* Welcome Text */}
      <div>
        <h1 className="text-xl font-semibold text-[var(--black-custom)]" style={{ fontFamily: 'var(--font-poppins)' }}>
          Selamat datang, {userData?.username || 'User'}! 👋
        </h1>
        <p className="text-sm text-gray-500">Kelola bisnis Anda dengan mudah hari ini</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <Link
          href="/notifications"
          className="relative p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
        >
          <Bell className="h-5 w-5 text-gray-500 group-hover:text-[var(--primary-custom)] transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>

        {/* Divider */}
        <div className="h-10 w-px bg-gray-200"></div>

        {/* User Profile */}
        <button
          onClick={() => router.push('/profile')}
          className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-xl transition-colors"
        >
          <img
            src={userData?.profile_image || "/images/profile.png"}
            alt="User Avatar"
            className="rounded-full w-10 h-10 object-cover ring-2 ring-gray-100"
          />
          <div className="text-left">
            <p className="font-semibold text-sm text-[var(--black-custom)]">{userData?.username}</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </button>
      </div>
    </header>
  );
}

