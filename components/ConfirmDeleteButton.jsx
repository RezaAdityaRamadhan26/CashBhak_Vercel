"use client";

import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationContext";
import { Trash2, AlertTriangle } from "lucide-react";

export default function ConfirmDeleteButton({ formId, productName }) {
    const { addNotification } = useNotifications();

    const onClick = () => {
        toast.custom((t) => (
            <div className="bg-white border border-gray-100 rounded-2xl shadow-xl p-5 w-[320px]">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-[var(--black-custom)]">Hapus Produk?</h4>
                        <p className="text-sm text-gray-500 mt-1">
                            Produk &quot;{productName}&quot; akan dihapus secara permanen.
                        </p>
                    </div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                    <button
                        type="button"
                        className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                        onClick={() => toast.dismiss(t)}
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        className="flex-1 py-2.5 px-4 rounded-xl text-white text-sm font-medium bg-red-500 hover:bg-red-600 transition-colors"
                        onClick={() => {
                            const form = document.getElementById(formId);
                            if (form) {
                                form.requestSubmit();
                                toast.success("Produk berhasil dihapus");
                                addNotification({
                                    type: 'info',
                                    title: 'Produk Dihapus',
                                    description: `${productName || 'Produk'} telah dihapus dari items data.`,
                                });
                            }
                            toast.dismiss(t);
                        }}
                    >
                        Ya, Hapus
                    </button>
                </div>
            </div>
        ), { duration: 10000 });
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-red-500 text-white text-sm rounded-xl transition-all duration-200 hover:bg-red-600 active:scale-[0.98] font-medium"
        >
            <Trash2 className="h-4 w-4" />
            Hapus
        </button>
    );
}
