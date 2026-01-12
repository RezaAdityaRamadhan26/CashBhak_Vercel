"use client"

import { signOut } from "next-auth/react"
import Image from "next/image"
import { useNotifications } from "@/context/NotificationContext";

export default function Logout() {
  const { addNotification } = useNotifications();

  async function FullOut() {
    try {
      addNotification({
        type: 'info',
        title: 'Logout Berhasil',
        description: 'Anda telah berhasil keluar dari akun Anda.',
      });

      // Wait a bit for notification to be saved
      await new Promise(resolve => setTimeout(resolve, 100));

      // Properly call signOut with redirect
      await signOut({ callbackUrl: '/', redirect: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  return (
    <button
      className="flex items-center gap-2 p-2 rounded-md w-full text-[var(--light-custom)] bg-[var(--red-custom)] hover:bg-[var(--red-custom)] hover:opacity-50 transition-opacity"
      style={{ fontFamily: "var(--font-poppins)" }}
      onClick={FullOut}
    >
      <Image src="/images/logout.png" alt="Log Out" width={20} height={20} className="flex-shrink-0" />
      <span className="font-medium">Log Out</span>
    </button>
  )
}