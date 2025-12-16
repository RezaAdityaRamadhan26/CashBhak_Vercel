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
import { updatePassword } from "@/lib/action";

export function PwEdit() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Password</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Password</DialogTitle>
          <DialogDescription>
            Ubah password akun anda sesuai keinginan Anda. <strong>Password akan berubah ketika di login selanjutnya.</strong>
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" action={updatePassword}>
          <div className="grid gap-3">
            <Label htmlFor="password">Name</Label>
            <Input id="password" type='password' name="password" placeholder='Password baru anda...' />
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
