"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { UpdateAvatar } from "@/lib/action";
import { Upload, ImageIcon } from "lucide-react";

export function AvatarEdit() {
  const [preview, setPreview] = useState(null);
  const [base64, setBase64] = useState("");
  const fileInputRef = useRef(null);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Batas ukuran 2MB
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file maksimal 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setBase64(reader.result); // base64 string lengkap termasuk data:image/...
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!base64) return;

    const formData = new FormData();
    formData.append("profile_image", base64);
    await UpdateAvatar(formData);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile Picture</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile Picture</DialogTitle>
          <DialogDescription>
            Pilih foto dari perangkat Anda. <strong>Foto akan berubah setelah login ulang.</strong>
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-3">
            <Label>Foto Profil</Label>

            {/* Preview area */}
            <div
              className="w-full h-48 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-[var(--primary-custom)] hover:bg-gray-100 transition-colors overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <ImageIcon className="h-10 w-10 text-gray-300 mb-2" />
                  <p className="text-sm text-gray-400">Klik untuk memilih foto</p>
                  <p className="text-xs text-gray-300 mt-1">JPG, PNG, GIF (Maks. 2MB)</p>
                </>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {preview && (
              <button
                type="button"
                onClick={() => { setPreview(null); setBase64(""); }}
                className="text-sm text-red-500 hover:text-red-700 text-left transition-colors"
              >
                Hapus foto
              </button>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">Batal</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" disabled={!base64} className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Simpan
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
