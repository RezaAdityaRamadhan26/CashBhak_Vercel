"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateName } from "@/lib/action";

export function NameEdit() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Name</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Nama</DialogTitle>
          <DialogDescription>
            Ubah nama akun anda sesuai keinginan Anda. <strong>Nama akan berubah ketika di login selanjutnya.</strong>
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" action={updateName}>
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type='text' placeholder='Nama baru anda...' />
          </div>


          <div className="flex justify-end gap-2 pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
            
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
