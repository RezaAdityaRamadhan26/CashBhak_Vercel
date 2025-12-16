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
import { updateEmail } from "@/lib/action";

export function EmailEdit() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Email</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Email</DialogTitle>
          <DialogDescription>
            Ubah email akun anda sesuai keinginan Anda. <strong>Email akan berubah ketika di login selanjutnya.</strong>
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" action={updateEmail}>
          <div className="grid gap-3">
            <Label htmlFor="email">Name</Label>
            <Input id="email" type='email' name="email" placeholder='Email baru anda...' />
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
