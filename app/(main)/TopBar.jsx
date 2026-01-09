import { Bell } from 'lucide-react';
import Image from 'next/image';
import { fetchUserData } from '@/lib/action';

export default async function Topbar() {
  const userData = await fetchUserData();

  return (
    <header className="flex justify-between md:justify-end items-center p-3 md:p-4 bg-white shadow-sm rounded-xl mb-4 md:mb-6">
      {/* Logo for mobile */}
      <div className="flex md:hidden items-center gap-2">
        <img src="/images/logo.png" alt="Logo" className="w-8 h-8" />
        <span className="text-lg font-bold text-[var(--black-custom)]">CashBhak</span>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        <Bell className="h-5 w-5 md:h-6 md:w-6 text-gray-500 cursor-pointer hover:text-black" />
        <div className="flex items-center gap-2 md:gap-3">
          <img src={userData.profile_image || "/images/profile.png"} alt="User Avatar" className="rounded-full w-8 h-8 md:w-10 md:h-10 object-cover" />
          <div className="text-right hidden sm:block">
            <div className="font-semibold text-sm md:text-base text-[var(--black-custom)]">{userData.username}</div>
          </div>
        </div>
      </div>
    </header>
  )

}

