"use client";

import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationContext";

export default function ConfirmDeleteButton({ formId, productName }) {
    const { addNotification } = useNotifications();

    const onClick = () => {
        toast.custom((t) => (
            <div className="bg-white border rounded-md shadow-lg p-3 w-[300px]">
                <p className="text-sm font-medium text-[var(--black-custom)]">Yakin ingin menghapus barang ini?</p>
                <div className="mt-3 flex items-center justify-end gap-2">
                    <button
                        type="button"
                        className="px-3 py-1.5 rounded-md text-white text-xs bg-green-500 hover:bg-green-600"
                        onClick={() => toast.dismiss(t)}
                    >
                        No
                    </button>
                    <button
                        type="button"
                        className="px-3 py-1.5 rounded-md text-white text-xs bg-red-500 hover:bg-red-600"
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
                        Yes
                    </button>
                </div>
            </div>
        ), { duration: 10000 });
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className="flex-1 py-2 px-3 bg-[var(--red-custom)] text-white text-sm rounded-md transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
        >
            Delete
        </button>
    );
}
