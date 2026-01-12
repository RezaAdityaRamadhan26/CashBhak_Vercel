"use client";

import { useNotifications } from "@/context/NotificationContext";
import { Trash2, Bell, ArrowLeft, Check, CheckCheck } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function NotificationsPage() {
    const { notifications, removeNotification, clearAllNotifications, markAsRead, markAllAsRead } =
        useNotifications();

    // Mark all as read when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            markAllAsRead();
        }, 1000); // Wait 1 second before marking as read

        return () => clearTimeout(timer);
    }, [markAllAsRead]);

    const getNotificationIcon = (type) => {
        switch (type) {
            case "success":
                return "✓";
            case "error":
                return "✕";
            case "warning":
                return "!";
            case "info":
                return "i";
            default:
                return "•";
        }
    };

    const getNotificationColor = (type) => {
        switch (type) {
            case "success":
                return "bg-green-50 border-green-200";
            case "error":
                return "bg-red-50 border-red-200";
            case "warning":
                return "bg-yellow-50 border-yellow-200";
            case "info":
                return "bg-blue-50 border-blue-200";
            default:
                return "bg-gray-50 border-gray-200";
        }
    };

    const getIconBgColor = (type) => {
        switch (type) {
            case "success":
                return "bg-green-100 text-green-600";
            case "error":
                return "bg-red-100 text-red-600";
            case "warning":
                return "bg-yellow-100 text-yellow-600";
            case "info":
                return "bg-blue-100 text-blue-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const formatTime = (date) => {
        const now = new Date();
        const diff = now - new Date(date);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return "Baru saja";
        if (minutes < 60) return `${minutes} menit lalu`;
        if (hours < 24) return `${hours} jam lalu`;
        if (days < 7) return `${days} hari lalu`;

        return new Date(date).toLocaleDateString("id-ID", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-gray-500 hover:text-black transition-colors p-1 hover:bg-gray-100 rounded-lg">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <Bell className="h-6 w-6 text-[var(--primary-custom)]" />
                            <h1 className="text-2xl font-bold text-[var(--black-custom)]" style={{ fontFamily: 'var(--font-poppins)' }}>
                                Notifikasi
                            </h1>
                        </div>
                        {notifications.length > 0 && (
                            <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                                {notifications.length}
                            </span>
                        )}
                    </div>
                    {notifications.length > 0 && (
                        <button
                            onClick={clearAllNotifications}
                            className="text-sm text-red-600 hover:text-red-700 transition-colors font-medium px-3 py-1.5 hover:bg-red-50 rounded-lg"
                        >
                            Hapus Semua
                        </button>
                    )}
                </div>
            </div>

            {/* Notifications List */}
            <div className="max-w-4xl mx-auto p-4">
                {notifications.length === 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center shadow-sm">
                        <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-600 mb-2">
                            Tidak Ada Notifikasi
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Semua notifikasi Anda sudah dibaca. Periksa kembali nanti untuk pembaruan.
                        </p>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary-custom)] text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                        >
                            Kembali ke Dashboard
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {notifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`border rounded-lg p-4 flex items-start gap-4 bg-white hover:shadow-md transition-all ${getNotificationColor(
                                    notif.type
                                )} ${!notif.isRead ? 'ring-2 ring-blue-200' : ''}`}
                            >
                                <div
                                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${getIconBgColor(
                                        notif.type
                                    )}`}
                                >
                                    {getNotificationIcon(notif.type)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="font-semibold text-[var(--black-custom)] text-sm md:text-base">
                                            {notif.title}
                                        </h3>
                                        {!notif.isRead && (
                                            <span className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                                        )}
                                    </div>
                                    {notif.description && (
                                        <p className="text-gray-600 text-sm mt-1 leading-relaxed">{notif.description}</p>
                                    )}
                                    <div className="flex items-center gap-2 mt-2">
                                        <p className="text-gray-500 text-xs">
                                            {formatTime(notif.timestamp)}
                                        </p>
                                        {notif.isRead && (
                                            <CheckCheck className="h-3 w-3 text-gray-400" />
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeNotification(notif.id)}
                                    className="flex-shrink-0 text-gray-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                    title="Hapus notifikasi"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
