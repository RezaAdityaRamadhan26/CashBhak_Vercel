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
import { Pencil, Package, DollarSign, Layers, ImageIcon, Loader2, Save, ScanLine, Keyboard, Link, Upload, X } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationContext";
import BarcodeScanner from "@/components/BarcodeScanner";
import Image from "next/image";

export function DialogEdit({ item }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [barcode, setBarcode] = useState(item.barcode || "");
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [barcodeInputMode, setBarcodeInputMode] = useState("manual");
  const [imageInputMode, setImageInputMode] = useState("link"); // "link" or "file"
  const [imageUrl, setImageUrl] = useState(item.product_image || "");
  const [imagePreview, setImagePreview] = useState(item.product_image || "");
  const fileInputRef = useRef(null);
  const formRef = useRef(null);
  const { addNotification } = useNotifications();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error("Format file tidak didukung. Gunakan JPG, PNG, GIF, atau WebP.");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 5MB");
        return;
      }

      // Create preview and convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        setImageUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImageUrl("");
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function handleSubmit(formData) {
    setIsLoading(true);
    try {
      // Set image URL (either from link or base64 from file)
      formData.set("product_image", imageUrl);

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

      <DialogContent className="sm:max-w-[480px] p-0 gap-0 rounded-2xl overflow-hidden border-0 max-h-[90vh] overflow-y-auto">
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
              <label className="text-sm font-medium text-gray-700">Gambar Produk</label>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => {
                    setImageInputMode("link");
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${imageInputMode === "link"
                    ? "bg-[var(--primary-custom)] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <Link className="h-4 w-4" />
                  Link URL
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setImageInputMode("file");
                  }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${imageInputMode === "file"
                    ? "bg-[var(--primary-custom)] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <Upload className="h-4 w-4" />
                  Upload File
                </button>
              </div>

              {imageInputMode === "link" ? (
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setImagePreview(e.target.value);
                    }}
                    placeholder="https://example.com/image.jpg"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-[var(--black-custom)] placeholder:text-gray-400 focus:outline-none focus:border-[var(--primary-custom)] focus:ring-2 focus:ring-[var(--primary-custom)]/20 transition-all"
                  />
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-[var(--primary-custom)] transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Klik untuk upload gambar baru</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF, WebP (Maks. 5MB)</p>
                </div>
              )}

              {/* Image Preview */}
              {imagePreview && (
                <div className="relative mt-3">
                  <div className="relative w-full h-32 bg-gray-100 rounded-xl overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-contain"
                      onError={() => {
                        setImagePreview("");
                        toast.error("Gagal memuat preview gambar");
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
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
