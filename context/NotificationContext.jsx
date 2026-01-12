"use client";

import React, { createContext, useState, useCallback, useEffect } from 'react';

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    // Load notifications from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('notifications');
        if (stored) {
            try {
                setNotifications(JSON.parse(stored));
            } catch (error) {
                console.error('Error loading notifications:', error);
            }
        }
    }, []);

    // Save notifications to localStorage whenever they change
    useEffect(() => {
        if (notifications.length > 0) {
            localStorage.setItem('notifications', JSON.stringify(notifications));
        } else {
            localStorage.removeItem('notifications');
        }
    }, [notifications]);

    const addNotification = useCallback((notification) => {
        const id = Date.now();
        const newNotification = {
            id,
            timestamp: new Date().toISOString(),
            isRead: false,
            ...notification,
        };
        setNotifications((prev) => [newNotification, ...prev]);
        return id;
    }, []);

    const markAsRead = useCallback((id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
    }, []);

    const markAllAsRead = useCallback(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const clearAllNotifications = useCallback(() => {
        setNotifications([]);
    }, []);
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                markAsRead,
                markAllAsRead,
                removeNotification,
                clearAllNotifications,
                unreadCount,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = React.useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within NotificationProvider');
    }
    return context;
}
