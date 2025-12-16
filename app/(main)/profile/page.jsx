import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NameEdit } from '@/components/NameEdit';
import { PwEdit } from '@/components/PwEdit';
import { EmailEdit } from '@/components/EmailEdit';
import { fetchUserData } from '@/lib/action';
import { AvatarEdit } from '@/components/AvatarEdit';

const subscriptionHistory = [
  { id: 5, plan: 'Paket Trial 3 Bulan', price: 'Gratis', start: '1/Januari/2024', end: '1/April/2024', payment: 'Sudah Dibayar', status: 'Nonaktif' },
  { id: 4, plan: 'Paket 6 Bulan', price: 'Rp. 600.000', start: '1/April/2024', end: '1/Oktober/2024', payment: 'Sudah Dibayar', status: 'Nonaktif' },
  { id: 3, plan: 'Paket 6 Bulan', price: 'Rp. 600.000', start: '1/Oktober/2024', end: '1/April/2025', payment: 'Sudah Dibayar', status: 'Nonaktif' },
  { id: 2, plan: 'Paket 6 Bulan', price: 'Rp. 600.000', start: '1/April/2025', end: '1/Oktober/2025', payment: 'Sudah Dibayar', status: 'Nonaktif' },
  { id: 1, plan: 'Paket 6 Bulan', price: 'Rp. 600.000', start: '1/Oktober/2025', end: '1/April/2026', payment: 'Sudah Dibayar', status: 'Aktif' },
];


// Komponen untuk status badge
const StatusBadge = ({ text, type }) => {
  const baseStyle = "px-3 py-1 rounded-full text-xs font-medium";
  const styles = {
    paid: "bg-green-100 text-green-700", // "Sudah Dibayar"
    active: "bg-blue-100 text-blue-700", // "Aktif"
    inactive: "bg-gray-100 text-gray-600" // "Nonaktif"
  };
  return (
    <span className={`${baseStyle} ${styles[type] || styles.inactive}`}>
      {text}
    </span>
  );
};


export default async function ProfilePage() {

  const userData = await fetchUserData();
  return (
    <div className="w-full space-y-6">

      {/* Kartu Profil */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-[var(--black-custom)] mb-6">
          Profile
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Kiri: Info Akun */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <img
                src={userData.profile_image || "/images/profile.png"} // Pastikan path ini benar
                alt="User Avatar"
                className="rounded-full object-cover w-20 h-20"
              />
              <AvatarEdit></AvatarEdit>
            </div>

            <h3 className="text-lg font-semibold text-[var(--black-custom)] pt-4">
              Account Information
            </h3>
            <form className="space-y-4">
              <div className='flex gap-5'>
                <Input label="Username" value={userData.username} readOnly />
                <NameEdit></NameEdit>
              </div>
              <div className='flex gap-5'>
                <Input label="Email" value={userData.email} readOnly />
                <EmailEdit></EmailEdit>
              </div>
              <div className='flex gap-5'>
                <Input label="Password" value="**********" type="password" readOnly />

                <PwEdit></PwEdit>
              </div>
            </form>
          </div>

          {/* Kanan: Ilustrasi (Opsional) */}
          <div className="flex-1 items-center justify-center hidden lg:flex">
            <Image src="/images/image-profile.png" alt="Illustration" width={200} height={100} className="rounded-lg object-cover" />
          </div>
        </div>
      </div>

      {/* Kartu Subscription History */}
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold text-[var(--black-custom)] mb-6">
          Subscription History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-max text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-600 uppercase text-sm">
                <th className="py-3 px-4">Paket Langganan</th>
                <th className="py-3 px-4">Biaya</th>
                <th className="py-3 px-4">Tanggal Mulai</th>
                <th className="py-3 px-4">Tanggal Akhir</th>
                <th className="py-3 px-4">Status Pembayaran</th>
                <th className="py-3 px-4">Status Membership</th>
              </tr>
            </thead>
            <tbody className="text-[var(--black-custom)]">
              {subscriptionHistory.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{item.plan}</td>
                  <td className="py-3 px-4">{item.price}</td>
                  <td className="py-3 px-4">{item.start}</td>
                  <td className="py-3 px-4">{item.end}</td>
                  <td className="py-3 px-4">
                    <StatusBadge text={item.payment} type="paid" />
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge
                      text={item.status}
                      type={item.status === 'Aktif' ? 'active' : 'inactive'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}