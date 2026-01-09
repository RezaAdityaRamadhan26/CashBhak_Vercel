import { deleteData, fetchItems } from "@/lib/action";
import { Plus } from "lucide-react";
import Image from "next/image";
import { DialogAdd } from "@/components/FormAddItems";
import { DialogEdit } from "@/components/FormEditItems";

export default async function ItemsDataPage() {
  const items = await fetchItems();

  return (
    <div className="w-full">
      <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-xl font-semibold text-[var(--black-custom)]">Items Data</h2>
          <DialogAdd></DialogAdd>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {items.map((item) => (
            <div
              className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              key={item.product_id}>
              <div className="relative w-full aspect-[4/3] bg-gray-100">
                <Image
                  src={item.product_image}
                  alt={item.product_name || 'Product Image'}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain p-2"
                  priority={false}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[var(--black-custom)]">
                  {item.product_name}
                </h3>
                <p className="text-sm text-gray-500">Stock: {item.stock}</p>
                <p className="text-[var(--primary-custom)] font-bold mt-1">
                  Rp. {item.price.toLocaleString("id-ID")}
                </p>
                <div className="flex gap-2 mt-4">
                  <DialogEdit item={item} />
                  <form action={deleteData}>
                    <input type="hidden" value={item.product_id} name="id" />
                    <button className="flex-1 py-2 px-3 bg-[var(--red-custom)] text-white text-sm rounded-md transition-all duration-200 hover:opacity-90 active:scale-[0.98]">
                      Delete
                    </button>
                  </form>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
