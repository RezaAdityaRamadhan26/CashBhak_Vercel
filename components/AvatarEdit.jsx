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
import { UpdateAvatar } from "@/lib/action";

export function AvatarEdit() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile PIcture</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile Picture</DialogTitle>
          <DialogDescription>
            Ubah profile picture akun anda sesuai keinginan Anda. <strong>P akan berubFotoh ketika di login selanjutnya.</strong>
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" action={UpdateAvatar}>
          <div className="grid gap-3">
            <Label htmlFor="password">Url Foto</Label>
            <Input id="profile_image" type='text' name="profile_image" placeholder='Url Gambar anda...' />
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
