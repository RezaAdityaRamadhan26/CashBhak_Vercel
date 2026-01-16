"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateProduct } from "@/lib/action";
import { Pencil, Package, DollarSign, Layers, ImageIcon, Loader2, Save, ScanLine, Keyboard } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationContext";
import BarcodeScanner from "@/components/BarcodeScanner";

export function DialogEdit({ item }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [barcode, setBarcode] = useState(item.barcode || "");
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [barcodeInputMode, setBarcodeInputMode] = useState("manual");
  const formRef = useRef(null);
  const { addNotification } = useNotifications();

  async function handleSubmit(formData) {
    setIsLoading(true);
    try {
      await updateProduct(formData);
      setOpen(false);
      toast.success("Produk berhasil diperbarui");
      addNotification({
        type: 'success',
        title: 'Produk Diperbarui',
        description: `${formData.get('product_name')} telah diperbarui.`,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Gagal mengupdate produk");
    } finally {
      setIsLoading(false);
    }
  }

  const handleBarcodeScan = (scannedValue) => {
    setBarcode(scannedValue);
    toast.success(`Barcode terdeteksi: ${scannedValue}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[var(--primary-custom)] text-white rounded-lg hover:bg-[var(--primary-custom)]/90 transition-all font-medium text-xs">
          <Pencil className="h-3.5 w-3.5" />
          Edit
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px] p-0 gap-0 rounded-2xl overflow-hidden border-0">
        <form action={handleSubmit} ref={formRef}>
          {/* Header */}
          <div className="bg-gradient-to-r from-[var(--blue-custom)] to-[var(--primary-custom)] p-6 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Pencil className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold text-white">Edit Produk</DialogTitle>
                <DialogDescription className="text-white/80 text-sm mt-0.5">
                  Ubah informasi produk yang sudah ada
                </DialogDescription>
              </div>
            </div>
          </div>

          <input type="hidden" name="product_id" value={item.product_id} />

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
                  defaultValue={item.product_name}
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-[var(--black-custom)] placeholder:text-gray-400 focus:outline-none focus:border-[var(--primary-custom)] focus:ring-2 focus:ring-[var(--primary-custom)]/20 transition-all"
                />
              </div>
            </div>

            {/* Barcode Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Barcode Produk</label>
                <div className="flex bg-gray-100 rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => setBarcodeInputMode("manual")}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${barcodeInputMode === "manual"
                      ? "bg-white text-[var(--primary-custom)] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    <Keyboard className="h-3 w-3" />
                    Manual
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setBarcodeInputMode("camera");
                      setShowBarcodeScanner(true);
                    }}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${barcodeInputMode === "camera"
                      ? "bg-white text-[var(--primary-custom)] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    <ScanLine className="h-3 w-3" />
                    Kamera
                  </button>
                </div>
              </div>
              <div className="relative">
                <ScanLine className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  placeholder="Masukkan atau scan barcode"
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-[var(--black-custom)] placeholder:text-gray-400 focus:outline-none focus:border-[var(--primary-custom)] focus:ring-2 focus:ring-[var(--primary-custom)]/20 transition-all"
                />
              </div>
              <p className="text-xs text-gray-400">Opsional - untuk scan cepat di halaman transaksi</p>
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
                    defaultValue={item.price}
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
                    defaultValue={item.stock}
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
                  defaultValue={item.product_image}
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
              className="flex-1 py-3 px-4 bg-gradient-to-r from-[var(--blue-custom)] to-[var(--primary-custom)] text-white rounded-xl hover:shadow-lg hover:shadow-[var(--blue-custom)]/30 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Simpan Perubahan
                </>
              )}
            </button>
          </div>
        </form>

        {/* Barcode Scanner Modal */}
        <BarcodeScanner
          isOpen={showBarcodeScanner}
          onClose={() => setShowBarcodeScanner(false)}
          onScanSuccess={handleBarcodeScan}
        />
      </DialogContent>
    </Dialog>
  );
}
