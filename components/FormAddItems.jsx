"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Package, DollarSign, Layers, ImageIcon, Loader2 } from "lucide-react";
import { pushProduct } from "@/lib/action";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationContext";

export function DialogAdd() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);
  const { addNotification } = useNotifications();

  async function handleSubmit(formData) {
    setIsLoading(true);
    try {
      await pushProduct(formData);
      setOpen(false);
      formRef.current?.reset();
      toast.success("Produk berhasil ditambahkan");
      addNotification({
        type: 'success',
        title: 'Produk Ditambahkan',
        description: `${formData.get('product_name')} telah ditambahkan ke items data.`,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Gagal menambahkan produk");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary-custom)] text-white rounded-xl hover:bg-[var(--primary-custom)]/90 transition-all font-medium shadow-lg shadow-[var(--primary-custom)]/30">
          <Plus className="h-5 w-5" />
          <span>Tambah Produk</span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] p-0 gap-0 rounded-2xl overflow-hidden border-0">
        <form action={handleSubmit} ref={formRef}>
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--primary-custom)] to-[var(--blue-custom)] p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-white">Tambah Produk Baru</DialogTitle>
                <DialogDescription className="text-white/80 text-sm mt-0.5">
                  Lengkapi informasi produk di bawah ini
                </DialogDescription>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-5">
            {/* Product Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nama Produk</label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="product_name"
                  placeholder="Masukkan nama produk"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-[var(--black-custom)] placeholder:text-gray-400 focus:outline-none focus:border-[var(--primary-custom)] focus:ring-2 focus:ring-[var(--primary-custom)]/20 transition-all"
                />
              </div>
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Harga</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    name="price"
                    placeholder="0"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-[var(--black-custom)] placeholder:text-gray-400 focus:outline-none focus:border-[var(--primary-custom)] focus:ring-2 focus:ring-[var(--primary-custom)]/20 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Stok</label>
                <div className="relative">
                  <Layers className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    name="stock"
                    placeholder="0"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-[var(--black-custom)] placeholder:text-gray-400 focus:outline-none focus:border-[var(--primary-custom)] focus:ring-2 focus:ring-[var(--primary-custom)]/20 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Link Gambar Produk</label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="product_image"
                  placeholder="https://example.com/image.jpg"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-[var(--black-custom)] placeholder:text-gray-400 focus:outline-none focus:border-[var(--primary-custom)] focus:ring-2 focus:ring-[var(--primary-custom)]/20 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 flex gap-3">
            <DialogClose asChild>
              <button
                type="button"
                className="flex-1 py-3 px-4 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Batal
              </button>
            </DialogClose>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-[var(--primary-custom)] to-[var(--blue-custom)] text-white rounded-xl hover:shadow-lg hover:shadow-[var(--primary-custom)]/30 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  Simpan Produk
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
