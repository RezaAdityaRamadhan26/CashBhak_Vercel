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
              className="bg-white rounded-lg shadow-sm overflow-hidden"
              key={item.product_id}>
              <Image
                src={item.product_image}
                alt={item.name || 'Product Image'}
                width={200}
                height={150}
                className="w-full h-32 object-cover"
              />
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
                    <button className="flex-1 py-2 px-3 bg-[var(--red-custom)] text-white text-sm rounded-md hover:opacity-90">
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
