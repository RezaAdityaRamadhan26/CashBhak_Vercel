"use client";

import { useNotifications } from "@/context/NotificationContext";
import { Trash2, Bell, Check, CheckCheck, AlertCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function NotificationsPage() {
    const { notifications, removeNotification, clearAllNotifications, markAsRead, markAllAsRead } =
        useNotifications();

    // Mark all as read when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            markAllAsRead();
        }, 1000);
        return () => clearTimeout(timer);
    }, [markAllAsRead]);

    const getNotificationIcon = (type) => {
        switch (type) {
            case "success":
                return <Check className="h-5 w-5" />;
            case "error":
                return <XCircle className="h-5 w-5" />;
            case "warning":
                return <AlertTriangle className="h-5 w-5" />;
            case "info":
                return <Info className="h-5 w-5" />;
            default:
                return <Bell className="h-5 w-5" />;
        }
    };

    const getNotificationStyles = (type) => {
        switch (type) {
            case "success":
                return {
                    bg: "bg-green-50",
                    border: "border-green-200",
                    iconBg: "bg-green-100",
                    iconColor: "text-green-600"
                };
            case "error":
                return {
                    bg: "bg-red-50",
                    border: "border-red-200",
                    iconBg: "bg-red-100",
                    iconColor: "text-red-600"
                };
            case "warning":
                return {
                    bg: "bg-yellow-50",
                    border: "border-yellow-200",
                    iconBg: "bg-yellow-100",
                    iconColor: "text-yellow-600"
                };
            case "info":
                return {
                    bg: "bg-blue-50",
                    border: "border-blue-200",
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600"
                };
            default:
                return {
                    bg: "bg-gray-50",
                    border: "border-gray-200",
                    iconBg: "bg-gray-100",
                    iconColor: "text-gray-600"
                };
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

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className="w-full space-y-6">
            {/* Header Section */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[var(--primary-custom)] to-[var(--blue-custom)] rounded-2xl flex items-center justify-center shadow-lg shadow-[var(--primary-custom)]/30">
                            <Bell className="h-7 w-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-[var(--black-custom)]">
                                Notifikasi
                            </h1>
                            <p className="text-gray-500 text-sm">
                                {notifications.length === 0
                                    ? "Tidak ada notifikasi"
                                    : `${notifications.length} notifikasi${unreadCount > 0 ? `, ${unreadCount} belum dibaca` : ''}`
                                }
                            </p>
                        </div>
                    </div>
                    {notifications.length > 0 && (
                        <button
                            onClick={clearAllNotifications}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm"
                        >
                            <Trash2 className="h-4 w-4" />
                            Hapus Semua
                        </button>
                    )}
                </div>
            </div>

            {/* Notifications List */}
            {notifications.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Bell className="h-10 w-10 text-gray-300" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">
                        Tidak Ada Notifikasi
                    </h2>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                        Semua notifikasi Anda sudah dibaca. Periksa kembali nanti untuk pembaruan.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--primary-custom)] to-[var(--blue-custom)] text-white rounded-xl hover:shadow-lg hover:shadow-[var(--primary-custom)]/30 transition-all font-medium"
                    >
                        Kembali ke Dashboard
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {notifications.map((notif) => {
                        const styles = getNotificationStyles(notif.type);
                        return (
                            <div
                                key={notif.id}
                                className={`bg-white rounded-2xl border p-5 flex items-start gap-4 transition-all hover:shadow-md ${!notif.isRead ? 'border-[var(--primary-custom)]/30 shadow-sm' : 'border-gray-100'
                                    }`}
                            >
                                {/* Icon */}
                                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${styles.iconBg} ${styles.iconColor}`}>
                                    {getNotificationIcon(notif.type)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-[var(--black-custom)]">
                                                    {notif.title}
                                                </h3>
                                                {!notif.isRead && (
                                                    <span className="w-2 h-2 bg-[var(--primary-custom)] rounded-full animate-pulse" />
                                                )}
                                            </div>
                                            {notif.description && (
                                                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                                                    {notif.description}
                                                </p>
                                            )}
                                            <div className="flex items-center gap-2 mt-3">
                                                <span className="text-gray-400 text-xs">
                                                    {formatTime(notif.timestamp)}
                                                </span>
                                                {notif.isRead && (
                                                    <span className="flex items-center gap-1 text-gray-400 text-xs">
                                                        <CheckCheck className="h-3 w-3" />
                                                        Dibaca
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Delete Button */}
                                <button
                                    onClick={() => removeNotification(notif.id)}
                                    className="flex-shrink-0 w-10 h-10 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center"
                                    title="Hapus notifikasi"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
