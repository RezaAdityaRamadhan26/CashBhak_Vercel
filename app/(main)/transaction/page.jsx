"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchItems, createTransaction } from "@/lib/action";
import { toast } from "sonner";
import { CreditCard, Plus, Minus, Loader2 } from "lucide-react";

const paymentMethods = [
  { key: "cash", label: "Cash", icon: "/images/money.png" },
  { key: "ewallet", label: "E-Wallet", icon: "/images/wallet.png" },
  { key: "card", label: "Card", icon: "/images/credit-card.png" },
];

export default function TransactionPage() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchItems().then((data) => setItems(data || []));
  }, []);

  const getCartQty = (product_id) => {
    const found = cart.find((i) => i.product_id === product_id);
    return found ? found.quantity : 0;
  };

  const handleAddToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.product_id === item.product_id);
      if (exist) {
        if (exist.quantity < item.stock) {
          return prev.map((i) =>
            i.product_id === item.product_id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return prev;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.product_id === item.product_id);
      if (exist && exist.quantity > 1) {
        return prev.map((i) =>
          i.product_id === item.product_id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        );
      } else {
        return prev.filter((i) => i.product_id !== item.product_id);
      }
    });
  };

  const handleUpdateQty = (product_id, amount) => {
    const item = items.find((i) => i.product_id === product_id);
    if (!item) return;
    if (amount > 0) {
      handleAddToCart(item);
    } else {
      handleRemoveFromCart(item);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleOrderProcess = async () => {
    if (cart.length === 0) {
      toast.warning("Keranjang Anda kosong");
      return;
    }

    setIsLoading(true);
    try {
      const result = await createTransaction(cart, paymentMethod);

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.success) {
        const total = cart.reduce((sum, it) => sum + it.price * it.quantity, 0);
        toast.success('Checkout berhasil', {
          description: `ID: ${result.transactionId} • Total: Rp. ${total.toLocaleString('id-ID')}`,
        });
        setCart([]);
        fetchItems().then((data) => setItems(data || []));
      }
    } catch (error) {
      toast.error(`Gagal memproses pesanan: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 md:gap-6">
      <div className="w-full lg:w-2/3">
        <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold text-[var(--black-custom)] mb-4">Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {items.map((item) => {
              const qty = getCartQty(item.product_id);
              return (
                <div
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                  key={item.product_id}
                >
                  <Image
                    src={item.product_image}
                    alt={item.product_name || "Product Image"}
                    width={200}
                    height={150}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-[var(--black-custom)]">
                      {item.product_name}
                    </h3>
                    <p className="text-sm text-gray-500">Stock: {item.stock}</p>
                    <p className="text-[var(--primary-custom)] font-bold">
                      Rp. {item.price?.toLocaleString("id-ID")}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        onClick={() => handleRemoveFromCart(item)}
                        disabled={qty === 0}
                        type="button"
                      >
                        <Minus className="h-4 w-4 text-gray-700" />
                      </button>
                      <span className="w-8 text-center font-medium">{qty}</span>
                      <button
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        onClick={() => handleAddToCart(item)}
                        disabled={qty >= item.stock}
                        type="button"
                      >
                        <Plus className="h-4 w-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3 lg:sticky lg:top-6 lg:h-fit">
        <div className="bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-sm min-w-0">
          <h2 className="text-lg md:text-xl font-semibold text-[var(--black-custom)] mb-4">
            Cart Items
          </h2>
          <div className="max-h-60 sm:max-h-80 overflow-y-auto divide-y divide-gray-200 pr-2">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-6 sm:py-10 text-sm sm:text-base">Cart is empty</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product_id}
                  className="flex items-start sm:items-center justify-between py-2 sm:py-3 gap-2"
                >
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <Image
                      src={item.product_image}
                      alt={item.product_name}
                      width={56}
                      height={56}
                      className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-sm sm:text-base text-[var(--black-custom)] truncate">
                        {item.product_name}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Rp. {item.price?.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 flex-shrink-0">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        onClick={() => handleUpdateQty(item.product_id, -1)}
                        className="p-0.5 sm:p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        disabled={item.quantity === 0}
                        type="button"
                      >
                        <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700" />
                      </button>
                      <span className="w-6 sm:w-8 text-center font-medium text-sm sm:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQty(item.product_id, 1)}
                        className="p-0.5 sm:p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                        disabled={
                          item.quantity >=
                          (items.find((i) => i.product_id === item.product_id)
                            ?.stock || 0)
                        }
                        type="button"
                      >
                        <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700" />
                      </button>
                    </div>
                    <p className="w-16 sm:w-24 text-right font-semibold text-xs sm:text-base text-[var(--black-custom)]">
                      Rp. {(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <hr className="my-3 sm:my-4 border-gray-200" />
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between font-semibold text-base sm:text-lg">
              <span className="text-[var(--black-custom)]">Total:</span>
              <span className="text-[var(--primary-custom)]">
                Rp. {totalPrice.toLocaleString("id-ID")}
              </span>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base text-[var(--black-custom)]">
                Payment Method:
              </h3>
              <div className="flex gap-2">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.key}
                    type="button"
                    onClick={() => setPaymentMethod(pm.key)}
                    className={`flex-1 p-2 border rounded-md flex flex-col items-center transition-all ${paymentMethod === pm.key
                      ? "border-[var(--primary-custom)] bg-[var(--primary-custom)]/10"
                      : "border-gray-200"
                      }`}
                  >
                    {pm.icon ? (
                      <Image
                        src={pm.icon}
                        alt={pm.label}
                        width={24}
                        height={24}
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                    ) : (
                      <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />
                    )}
                    <span
                      className={`text-xs mt-1 ${paymentMethod === pm.key
                        ? "text-[var(--primary-custom)] font-semibold"
                        : "text-gray-500"
                        }`}
                    >
                      {pm.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <button
              className="w-full py-2.5 sm:py-3 bg-[var(--primary-custom)] text-white rounded-lg font-semibold hover:opacity-90 transition-colors flex items-center justify-center disabled:opacity-50 text-sm sm:text-base"
              onClick={handleOrderProcess}
              disabled={isLoading || cart.length === 0}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Order Process"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}