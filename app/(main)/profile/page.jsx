import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NameEdit } from '@/components/NameEdit';
import { PwEdit } from '@/components/PwEdit';
import { EmailEdit } from '@/components/EmailEdit';
import { fetchUserData } from '@/lib/action';
import { AvatarEdit } from '@/components/AvatarEdit';
import { User, Mail, Lock, Calendar, CreditCard, CheckCircle2, Clock, Crown } from 'lucide-react';

const subscriptionHistory = [
  { id: 5, plan: 'Paket Trial 3 Bulan', price: 'Gratis', start: '1/Januari/2024', end: '1/April/2024', payment: 'Sudah Dibayar', status: 'Nonaktif' },
  { id: 4, plan: 'Paket 6 Bulan', price: 'Rp. 600.000', start: '1/April/2024', end: '1/Oktober/2024', payment: 'Sudah Dibayar', status: 'Nonaktif' },
  { id: 3, plan: 'Paket 6 Bulan', price: 'Rp. 600.000', start: '1/Oktober/2024', end: '1/April/2025', payment: 'Sudah Dibayar', status: 'Nonaktif' },
  { id: 2, plan: 'Paket 6 Bulan', price: 'Rp. 600.000', start: '1/April/2025', end: '1/Oktober/2025', payment: 'Sudah Dibayar', status: 'Nonaktif' },
  { id: 1, plan: 'Paket 6 Bulan', price: 'Rp. 600.000', start: '1/Oktober/2025', end: '1/April/2026', payment: 'Sudah Dibayar', status: 'Aktif' },
];

// Status badge component
const StatusBadge = ({ text, type }) => {
  const styles = {
    paid: "bg-green-100 text-green-700 border border-green-200",
    active: "bg-[var(--primary-custom)]/10 text-[var(--primary-custom)] border border-[var(--primary-custom)]/20",
    inactive: "bg-gray-100 text-gray-500 border border-gray-200"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${styles[type] || styles.inactive}`}>
      {type === 'paid' && <CheckCircle2 className="h-3 w-3" />}
      {type === 'active' && <Crown className="h-3 w-3" />}
      {type === 'inactive' && <Clock className="h-3 w-3" />}
      {text}
    </span>
  );
};

export default async function ProfilePage() {
  const userData = await fetchUserData();

  return (
    <div className="w-full space-y-6">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-r from-[var(--primary-custom)] to-[var(--blue-custom)] relative">
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10" />
        </div>

        {/* Profile Content */}
        <div className="px-6 sm:px-8 pb-8">
          <div className="flex flex-col md:flex-row gap-6 md:items-end -mt-16">
            {/* Avatar Section */}
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-white">
                <img
                  src={userData.profile_image || "/images/profile.png"}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2">
                <AvatarEdit />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 pt-4 md:pt-0 md:pb-2">
              <h2 className="text-2xl font-bold text-[var(--black-custom)]">{userData.username}</h2>
              <p className="text-gray-500">{userData.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--primary-custom)]/10 text-[var(--primary-custom)] rounded-full text-xs font-semibold">
                  <Crown className="h-3 w-3" />
                  Premium Member
                </span>
              </div>
            </div>
          </div>

          {/* Account Information Form */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-[var(--black-custom)] mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-[var(--primary-custom)]" />
              Informasi Akun
            </h3>

            <div className="space-y-4">
              {/* Username Field */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={userData.username}
                      readOnly
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[var(--black-custom)] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="sm:mt-8">
                  <NameEdit />
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={userData.email}
                      readOnly
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[var(--black-custom)] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="sm:mt-8">
                  <EmailEdit />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1 w-full">
                  <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      value="**********"
                      readOnly
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[var(--black-custom)] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="sm:mt-8">
                  <PwEdit />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription History Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-[var(--black-custom)] flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-[var(--primary-custom)]" />
              Riwayat Langganan
            </h2>
            <p className="text-sm text-gray-500 mt-1">Daftar paket langganan yang pernah digunakan</p>
          </div>
          <button className="px-4 py-2 bg-[var(--primary-custom)] text-white rounded-xl text-sm font-medium hover:bg-[var(--primary-custom)]/90 transition-colors shadow-lg shadow-[var(--primary-custom)]/30">
            Perpanjang Langganan
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Paket</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Biaya</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Mulai</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Berakhir</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Pembayaran</th>
                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="text-[var(--black-custom)]">
              {subscriptionHistory.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.status === 'Aktif' ? 'bg-[var(--primary-custom)]/10' : 'bg-gray-100'}`}>
                        <Crown className={`h-5 w-5 ${item.status === 'Aktif' ? 'text-[var(--primary-custom)]' : 'text-gray-400'}`} />
                      </div>
                      <span className="font-medium text-sm">{item.plan}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-semibold text-sm ${item.price === 'Gratis' ? 'text-green-600' : 'text-[var(--black-custom)]'}`}>
                      {item.price}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500 hidden sm:table-cell">{item.start}</td>
                  <td className="py-4 px-4 text-sm text-gray-500 hidden sm:table-cell">{item.end}</td>
                  <td className="py-4 px-4 hidden md:table-cell">
                    <StatusBadge text={item.payment} type="paid" />
                  </td>
                  <td className="py-4 px-4">
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