"use client"

import { signOut } from "next-auth/react"
import Image from "next/image"
import { redirect } from "next/navigation";
import { useNotifications } from "@/context/NotificationContext";

export default function Logout() {
  const { addNotification } = useNotifications();

  function FullOut() {
    signOut;
    addNotification({
      type: 'info',
      title: 'Logout Berhasil',
      description: 'Anda telah berhasil keluar dari akun Anda.',
    });

    console.log('Berhasil Keluar')

    redirect('/')
  }
  return (
    <button className="flex items-center gap-2 p-2 rounded-md w-full text-[var(--light-custom)] bg-[var(--red-custom)] hover:bg-[var(--red-custom)] hover:opacity-50 transition-opacity"
      style={{ fontFamily: "var(--font-poppins)" }} onClick={FullOut}>
      <Image src="/images/logout.png" alt="Log Out" width={20} height={20} className="flex-shrink-0" />
      <span className="font-medium">Log Out</span>
    </button>

  )
}