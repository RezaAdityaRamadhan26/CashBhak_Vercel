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
import { updateProduct } from "@/lib/action";
import { Pencil } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useNotifications } from "@/context/NotificationContext";

export function DialogEdit({ item }) {
  const [open, setOpen] = useState(false);
  const formRef = useRef(null);
  const { addNotification } = useNotifications();

  async function handleSubmit(formData) {
    try {
      await updateProduct(formData);
      setOpen(false); // Tutup dialog setelah berhasil
      toast.success("Produk berhasil diperbarui");
      addNotification({
        type: 'success',
        title: 'Produk Diperbarui',
        description: `${formData.get('product_name')} telah diperbarui.`,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Gagal mengupdate produk");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex-1 flex items-center gap-1 bg-[var(--primary-custom)]">
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form action={handleSubmit} ref={formRef}>
          <DialogHeader>
            <DialogTitle>Edit Produk</DialogTitle>
            <DialogDescription>
              Ubah informasi produk yang sudah ada.
            </DialogDescription>
          </DialogHeader>

          <input type="hidden" name="product_id" value={item.product_id} />

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="product_name">Nama Produk</Label>
              <Input
                type="text"
                name="product_name"
                defaultValue={item.product_name}
                required
              />
            </div>

            <div className="flex gap-5">
              <div className="grid gap-3 flex-1">
                <Label htmlFor="price">Harga</Label>
                <Input
                  type="number"
                  name="price"
                  defaultValue={item.price}
                  required
                />
              </div>
              <div className="grid gap-3 flex-1">
                <Label htmlFor="stock">Stok</Label>
                <Input
                  type="number"
                  name="stock"
                  defaultValue={item.stock}
                  required
                />
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="product_image">Link Gambar</Label>
              <Input
                type="text"
                name="product_image"
                defaultValue={item.product_image}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Simpan Perubahan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
