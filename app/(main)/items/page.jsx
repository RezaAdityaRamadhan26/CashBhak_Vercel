import { deleteData, fetchItems } from "@/lib/action";
import { Plus, Package, AlertCircle } from "lucide-react";
import Image from "next/image";
import { DialogAdd } from "@/components/FormAddItems";
import { DialogEdit } from "@/components/FormEditItems";
import ConfirmDeleteButton from "@/components/ConfirmDeleteButton";

export default async function ItemsDataPage() {
  const items = await fetchItems();

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--black-custom)]">Data Produk</h2>
            <p className="text-gray-500 text-sm mt-1">Kelola semua produk yang tersedia</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-[var(--primary-custom)]/10 rounded-xl">
              <span className="text-sm font-medium text-[var(--primary-custom)]">{items.length} Produk</span>
            </div>
            <DialogAdd />
          </div>
        </div>
      </div>

      {/* Items Grid */}
      {items.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center">
          <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Belum Ada Produk</h3>
          <p className="text-gray-500 text-sm mb-4">Mulai tambahkan produk pertama Anda</p>
          <DialogAdd />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item) => (
            <div
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              key={item.product_id}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                <Image
                  src={item.product_image}
                  alt={item.product_name || 'Product Image'}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  priority={false}
                />
                {/* Stock Badge */}
                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${item.stock > 10
                    ? 'bg-green-100 text-green-700'
                    : item.stock > 0
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                  {item.stock > 0 ? `Stok: ${item.stock}` : 'Habis'}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-[var(--black-custom)] truncate mb-1">
                  {item.product_name}
                </h3>
                <p className="text-2xl font-bold bg-gradient-to-r from-[var(--primary-custom)] to-[var(--blue-custom)] bg-clip-text text-transparent mb-4">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>

                {/* Low Stock Warning */}
                {item.stock > 0 && item.stock <= 5 && (
                  <div className="flex items-center gap-2 text-yellow-600 text-xs mb-4 p-2 bg-yellow-50 rounded-lg">
                    <AlertCircle className="h-4 w-4" />
                    <span>Stok hampir habis</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <DialogEdit item={item} />
                  <form action={deleteData} id={`delete-${item.product_id}`}>
                    <input type="hidden" value={item.product_id} name="id" />
                    <ConfirmDeleteButton formId={`delete-${item.product_id}`} productName={item.product_name} />
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
