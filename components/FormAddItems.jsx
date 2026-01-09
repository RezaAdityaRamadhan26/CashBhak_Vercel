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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { pushProduct } from "@/lib/action";
import { useState, useRef } from "react";
import { toast } from "sonner";

export function DialogAdd() {
  const [open, setOpen] = useState(false);
  const formRef = useRef(null);

  async function handleSubmit(formData) {
    try {
      await pushProduct(formData);
      setOpen(false); // Tutup dialog setelah berhasil
      formRef.current?.reset(); // Reset form
      toast.success("Produk berhasil ditambahkan");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Gagal menambahkan produk");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className='bg-[var(--primary-custom)]'>
          <Plus className="h-5 w-5" />
          Add Items
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form action={handleSubmit} ref={formRef}>
          <DialogHeader>
            <DialogTitle>Tambah Produk</DialogTitle>
            <DialogDescription>
              Tambahkan produk baru ke dalam daftar kamu.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="product_name">Nama Produk</Label>
              <Input
                type="text"
                name="product_name"
                placeholder="Nama Produk"
                required
              />
            </div>

            <div className="flex gap-5">
              <div className="grid gap-3 flex-1">
                <Label htmlFor="price">Harga</Label>
                <Input
                  type="number"
                  name="price"
                  placeholder="Rp. 2500.00"
                  required
                />
              </div>
              <div className="grid gap-3 flex-1">
                <Label htmlFor="stock">Stok Produk</Label>
                <Input
                  type="number"
                  name="stock"
                  placeholder="Stok: 69"
                  required
                />
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="product_image">Link Gambar Produk</Label>
              <Input
                type="text"
                name="product_image"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Simpan Produk</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
