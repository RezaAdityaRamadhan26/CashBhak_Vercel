"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchItems, createTransaction } from "@/lib/action";
import { toast } from "sonner";
import { CreditCard, Plus, Minus, Loader2, ShoppingCart, Package, Sparkles, Wallet, Banknote } from "lucide-react";
import { useNotifications } from "@/context/NotificationContext";

const paymentMethods = [
  { key: "cash", label: "Cash", icon: Banknote, color: "text-green-600" },
  { key: "ewallet", label: "E-Wallet", icon: Wallet, color: "text-blue-600" },
  { key: "card", label: "Card", icon: CreditCard, color: "text-purple-600" },
];

export default function TransactionPage() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useNotifications();

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

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

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
          description: `ID: ${result.transactionId} • Total: Rp ${total.toLocaleString('id-ID')}`,
        });
        addNotification({
          type: 'success',
          title: 'Checkout Berhasil',
          description: `ID: ${result.transactionId} • Total: Rp ${total.toLocaleString('id-ID')}`,
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
    <div className="w-full flex flex-col lg:flex-row gap-6">
      {/* Products Section */}
      <div className="w-full lg:w-2/3">
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[var(--black-custom)]">Pilih Produk</h2>
              <p className="text-sm text-gray-500">Klik untuk menambah ke keranjang</p>
            </div>
            <div className="px-4 py-2 bg-[var(--primary-custom)]/10 rounded-xl">
              <span className="text-sm font-medium text-[var(--primary-custom)]">{items.length} Produk</span>
            </div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Tidak ada produk tersedia</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {items.map((item) => {
                const qty = getCartQty(item.product_id);
                const isOutOfStock = item.stock === 0;
                const isInCart = qty > 0;

                return (
                  <div
                    className={`relative bg-white rounded-2xl border overflow-hidden transition-all duration-300 group ${isInCart
                      ? 'border-[var(--primary-custom)] shadow-lg shadow-[var(--primary-custom)]/20'
                      : 'border-gray-100 hover:border-gray-200 hover:shadow-md'
                      } ${isOutOfStock ? 'opacity-60' : ''}`}
                    key={item.product_id}
                  >
                    {/* Cart Badge */}
                    {isInCart && (
                      <div className="absolute top-3 left-3 z-10 w-7 h-7 bg-[var(--primary-custom)] rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-xs font-bold">{qty}</span>
                      </div>
                    )}

                    {/* Out of Stock Overlay */}
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                        <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">Habis</span>
                      </div>
                    )}

                    {/* Image */}
                    <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                      <Image
                        src={item.product_image}
                        alt={item.product_name || "Product Image"}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-3">
                      <h3 className="font-semibold text-[var(--black-custom)] truncate text-xs">
                        {item.product_name}
                      </h3>
                      <p className="text-xs text-gray-400">Stok: {item.stock}</p>
                      <p className="text-sm font-bold text-[var(--primary-custom)] mt-0.5">
                        Rp {item.price?.toLocaleString("id-ID")}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <button
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${qty === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-red-100 text-red-600 hover:bg-red-200'
                            }`}
                          onClick={() => handleRemoveFromCart(item)}
                          disabled={qty === 0}
                          type="button"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-bold text-sm text-[var(--black-custom)]">{qty}</span>
                        <button
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${qty >= item.stock
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[var(--primary-custom)] text-white hover:bg-[var(--primary-custom)]/90'
                            }`}
                          onClick={() => handleAddToCart(item)}
                          disabled={qty >= item.stock}
                          type="button"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Cart Section */}
      <div className="w-full lg:w-1/3 lg:sticky lg:top-6 lg:h-fit">
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          {/* Cart Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[var(--primary-custom)]/10 rounded-xl flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-[var(--primary-custom)]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--black-custom)]">Keranjang</h2>
                <p className="text-sm text-gray-500">{totalItems} item</p>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="max-h-[300px] overflow-y-auto space-y-3 pr-2 scrollbar-thin">
            {cart.length === 0 ? (
              <div className="text-center py-10">
                <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm">Keranjang masih kosong</p>
                <p className="text-gray-400 text-xs mt-1">Pilih produk untuk memulai</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product_id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <Image
                    src={item.product_image}
                    alt={item.product_name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-xl object-cover bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-[var(--black-custom)] truncate">
                      {item.product_name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      Rp {item.price?.toLocaleString("id-ID")} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-gray-200">
                      <button
                        onClick={() => handleUpdateQty(item.product_id, -1)}
                        className="w-7 h-7 rounded-md hover:bg-gray-100 flex items-center justify-center transition-colors"
                        type="button"
                      >
                        <Minus className="h-3 w-3 text-gray-600" />
                      </button>
                      <span className="w-6 text-center font-semibold text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQty(item.product_id, 1)}
                        className="w-7 h-7 rounded-md hover:bg-gray-100 flex items-center justify-center transition-colors"
                        disabled={
                          item.quantity >=
                          (items.find((i) => i.product_id === item.product_id)?.stock || 0)
                        }
                        type="button"
                      >
                        <Plus className="h-3 w-3 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-5" />

          {/* Summary */}
          <div className="space-y-4">
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium text-[var(--black-custom)]">Rp {totalPrice.toLocaleString("id-ID")}</span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-3 border-t border-dashed border-gray-200">
              <span className="font-semibold text-[var(--black-custom)]">Total</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-[var(--primary-custom)] to-[var(--blue-custom)] bg-clip-text text-transparent">
                Rp {totalPrice.toLocaleString("id-ID")}
              </span>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="font-semibold mb-3 text-sm text-[var(--black-custom)]">
                Metode Pembayaran
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {paymentMethods.map((pm) => {
                  const IconComponent = pm.icon;
                  return (
                    <button
                      key={pm.key}
                      type="button"
                      onClick={() => setPaymentMethod(pm.key)}
                      className={`p-3 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${paymentMethod === pm.key
                        ? "border-[var(--primary-custom)] bg-[var(--primary-custom)]/5"
                        : "border-gray-100 hover:border-gray-200"
                        }`}
                    >
                      <IconComponent className={`h-6 w-6 ${paymentMethod === pm.key ? 'text-[var(--primary-custom)]' : pm.color}`} />
                      <span className={`text-xs font-medium ${paymentMethod === pm.key
                        ? "text-[var(--primary-custom)]"
                        : "text-gray-500"
                        }`}>
                        {pm.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Checkout Button */}
            <button
              className="w-full py-4 bg-gradient-to-r from-[var(--primary-custom)] to-[var(--blue-custom)] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[var(--primary-custom)]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleOrderProcess}
              disabled={isLoading || cart.length === 0}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Proses Pesanan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}