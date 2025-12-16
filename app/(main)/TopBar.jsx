import { Bell } from 'lucide-react';
import Image from 'next/image';
import { fetchUserData } from '@/lib/action';

export default async function Topbar() {
  const userData = await fetchUserData();

  return (
    <header className="flex justify-end items-center p-4 bg-white shadow-sm rounded-xl mb-6">

      <div className="flex items-center gap-6">
        <Bell className="h-6 w-6 text-gray-500 cursor-pointer hover:text-black" />
        <div className="flex items-center gap-3">
          <img src={userData.profile_image || "/images/profile.png"} alt="User Avatar" className="rounded-full w-10 h-10 object-cover" />
          <div className="text-right">
            <div className="font-semibold text-[var(--black-custom)]">{userData.username}</div>
          </div>
        </div>
      </div>
    </header>
  )

}

