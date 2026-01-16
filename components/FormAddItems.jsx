"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Package, DollarSign, Layers, ImageIcon, Loader2, Barcode, Camera, Keyboard, Link, Upload, X } from "lucide-react";
import { pushProduct } from "@/lib/action";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationContext";
import BarcodeScanner from "@/components/BarcodeScanner";
import Image from "next/image";

export function DialogAdd() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState("");
  const [barcodeInputMode, setBarcodeInputMode] = useState("manual"); // "manual" or "camera"
  const [imageInputMode, setImageInputMode] = useState("link"); // "link" or "file"
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
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
      // Add barcode to formData
      formData.set("barcode", barcodeValue);
      // Set image URL (either from link or base64 from file)
      formData.set("product_image", imageUrl);

      await pushProduct(formData);
      setOpen(false);
      formRef.current?.reset();
      setBarcodeValue("");
      setImageUrl("");
      setImagePreview("");
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

  const handleBarcodeScan = (scannedValue) => {
    setBarcodeValue(scannedValue);
    toast.success(`Barcode terdeteksi: ${scannedValue}`);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary-custom)] text-white rounded-xl hover:bg-[var(--primary-custom)]/90 transition-all font-medium shadow-lg shadow-[var(--primary-custom)]/30">
            <Plus className="h-5 w-5" />
            <span>Tambah Produk</span>
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[480px] p-0 gap-0 rounded-2xl overflow-hidden border-0 max-h-[90vh] overflow-y-auto">
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
              {/* Barcode Section */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Barcode Produk</label>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => setBarcodeInputMode("manual")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${barcodeInputMode === "manual"
                      ? "bg-[var(--primary-custom)] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    <Keyboard className="h-4 w-4" />
                    Manual
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBarcodeScanner(true)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${barcodeInputMode === "camera"
                      ? "bg-[var(--primary-custom)] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    <Camera className="h-4 w-4" />
                    Scan Kamera
                  </button>
                </div>
                <div className="relative">
                  <Barcode className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="barcode"
                    value={barcodeValue}
                    onChange={(e) => setBarcodeValue(e.target.value)}
                    placeholder="Masukkan atau scan barcode"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-[var(--black-custom)] placeholder:text-gray-400 focus:outline-none focus:border-[var(--primary-custom)] focus:ring-2 focus:ring-[var(--primary-custom)]/20 transition-all"
                  />
                </div>
                {barcodeValue && (
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    ✓ Barcode: {barcodeValue}
                  </p>
                )}
              </div>

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
                <label className="text-sm font-medium text-gray-700">Gambar Produk</label>
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={() => {
                      setImageInputMode("link");
                      clearImage();
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
                      clearImage();
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
                    <p className="text-sm text-gray-600">Klik untuk upload gambar</p>
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

      {/* Barcode Scanner Modal */}
      <BarcodeScanner
        isOpen={showBarcodeScanner}
        onClose={() => setShowBarcodeScanner(false)}
        onScanSuccess={handleBarcodeScan}
      />
    </>
  );
}