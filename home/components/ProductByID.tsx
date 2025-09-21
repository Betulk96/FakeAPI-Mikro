'use client';

import Image from 'next/image';
import { useState } from 'react';
import { BiStar } from 'react-icons/bi';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { CgShoppingCart } from 'react-icons/cg';
import { ProductByIDProps } from '../types/product';

export default function ProductByID({ product }: ProductByIDProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    setIsCartLoading(true);
    const raw = localStorage.getItem('micro_cart') || '[]';
    const cart = JSON.parse(raw);

    const existingIndex = cart.findIndex((it: any) => it.id === product.id);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem('micro_cart', JSON.stringify(cart));
    setIsCartLoading(false);

    // 🔹 Bildirim aç
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, index) => (
      <BiStar
        key={index}
        className={`h-5 w-5 ${
          index < Math.floor(rating) ? 'text-amber-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));

  return (
    <>
      {/* 🔹 Bildirim (Toast) */}
      {showToast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-6 py-4 rounded-2xl shadow-2xl animate-bounce backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <CgShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold">Added to Cart!</p>
              <p className="text-sm opacity-90">{quantity} item(s) added successfully</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
        {/* Image */}
        <div className="space-y-6">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100">
            <Image
              src={selectedImage}
              alt={product.title}
              fill
              className="object-contain p-8"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <span className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold">{product.title}</h1>

          {product.rating && (
            <div className="flex items-center gap-2">
              {renderStars(product.rating.rate)}
              <span className="text-gray-600">({product.rating.count} reviews)</span>
            </div>
          )}

          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-gray-700">{product.description}</p>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <button onClick={decrementQuantity} className="p-2 border rounded">
              <FiMinus />
            </button>
            <span className="px-4">{quantity}</span>
            <button onClick={incrementQuantity} className="p-2 border rounded">
              <FiPlus />
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={isCartLoading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl"
            >
              {isCartLoading ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
