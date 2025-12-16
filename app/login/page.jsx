import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div
              className="text-primary-foreground flex items-center justify-center">
              <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            </div>
            CashBhak Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-auto">
          © 2025 CashBhak. All Rights Reserved.
        </p>
      </div>
      <div className="bg-[var(--primary-custom)] flex flex-col justify-center items-center">
        <div className="text-left ">
          <h1 className="text-3xl font-bold text-white">Manage Your Sales Easily With us.</h1>
          <h3 className="text-lg text-white ">Continue To manage your business on CashBhak</h3>
        </div>
        <img src="/images/finance.png" alt="Finance Illustration" className="h-[500px] w-[500px] object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
  );
}
