"use client";

import { Bell } from 'lucide-react';
import Image from 'next/image';
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
      <header className="hidden md:flex justify-end items-center p-3 md:p-4 bg-white shadow-sm rounded-xl mb-4 md:mb-6">
        <div className="flex items-center gap-3 md:gap-6">
          <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse" />
          <div className="flex items-center gap-2 md:gap-3">
            <div className="rounded-full w-8 h-8 md:w-10 md:h-10 bg-gray-200 animate-pulse" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="hidden md:flex justify-end items-center p-3 md:p-4 bg-white shadow-sm rounded-xl mb-4 md:mb-6">
      <div className="flex items-center gap-3 md:gap-6">
        <Link href="/notifications" className="relative">
          <Bell className="h-5 w-5 md:h-6 md:w-6 text-gray-500 cursor-pointer hover:text-black transition-colors" title="Notifications" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>
        <button
          onClick={() => router.push('/profile')}
          className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity"
        >
          <img
            src={userData?.profile_image || "/images/profile.png"}
            alt="User Avatar"
            className="rounded-full w-8 h-8 md:w-10 md:h-10 object-cover cursor-pointer"
          />
          <div className="text-right hidden sm:block">
            <div className="font-semibold text-sm md:text-base text-[var(--black-custom)]">{userData?.username}</div>
          </div>
        </button>
      </div>
    </header>
  );
}

