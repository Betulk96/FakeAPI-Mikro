'use client';
import { useEffect, useState } from 'react';
import CartItem from '../components/CartItem';

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('micro_cart') || '[]';
    setItems(JSON.parse(raw));
  }, []);

  // 🔹 localStorage güncelle
  const updateCart = (newItems: any[]) => {
    setItems(newItems);
    localStorage.setItem('micro_cart', JSON.stringify(newItems));
  };

  // 🔹 ürün sil
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    updateCart(newItems);
  };

  // 🔹 miktar artır/azalt
  const updateQuantity = (index: number, delta: number) => {
    const newItems = [...items];
    newItems[index].quantity = Math.max(1, (newItems[index].quantity || 1) + delta);
    updateCart(newItems);
  };

  // 🔹 toplam fiyat
  const totalPrice = items.reduce(
    (sum, it) => sum + (it.price || 0) * (it.quantity || 1),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p>Sepet boş</p>
      ) : (
        <>
          <ul className="space-y-3">
            {items.map((it, idx) => (
              <CartItem
                key={idx}
                item={it}
                index={idx}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))}
          </ul>

          {/* 🔹 Toplam fiyat */}
            <div className="mt-6 text-right">
              
            <span className="text-lg font-semibold">
              Total: ${totalPrice.toFixed(2)}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
