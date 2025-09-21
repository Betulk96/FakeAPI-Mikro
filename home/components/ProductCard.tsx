'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { BiStar } from 'react-icons/bi';
import { CiShoppingCart, CiHeart } from 'react-icons/ci';
import { CgShoppingCart } from 'react-icons/cg';
import { AiFillHeart } from 'react-icons/ai';

type ProductCardProps = {
  product: any;
  showRating?: boolean;
};

export default function ProductCard({ product, showRating = false }: ProductCardProps) {
  const [isCartLoading, setIsCartLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [cartItem, setCartItem] = useState<any>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // ✅ Sepete ekleme fonksiyonu
  function handleAddToCart() {
    setIsCartLoading(true);

    setTimeout(() => {
      const raw = localStorage.getItem('micro_cart') || '[]';
      const cart = JSON.parse(raw);

      const existingIndex = cart.findIndex((it: any) => it.id === product.id);
      if (existingIndex !== -1) {
        cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
        setCartItem(cart[existingIndex]);
      } else {
        const newItem = { ...product, quantity: 1 };
        cart.push(newItem);
        setCartItem(newItem);
      }

      localStorage.setItem('micro_cart', JSON.stringify(cart));

      setIsCartLoading(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }, 800);
  }

  function handleToggleWishlist() {
    setIsInWishlist((prev) => !prev);
  }

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <BiStar
        key={index}
        className={`h-3.5 w-3.5 transition-colors ${index < Math.floor(rating) ? 'text-amber-400 fill-current' : 'text-gray-300'
          }`}
      />
    ));
  };

  return (
    <div className="card relative">
      {/* ✅ Notification */}
      {showNotification && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-50 bg-color1 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce">
          <div className="flex items-center space-x-2">
            <CgShoppingCart className="w-4 h-4" />
            <span>Add to cart</span>
          </div>
        </div>
      )}

      <Link href={`/product/${product.id}`} className="block h-full">
        <div className="relative h-full bg-gradient-to-br from-white via-color1/20 to-color4/10 dark:from-color5 dark:via-color4/10 dark:to-color3/5 rounded-2xl border border-color4/10 dark:border-color3/20 shadow-sm hover:shadow-2xl hover:shadow-color1/10 dark:hover:shadow-color2/10 transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-1 overflow-hidden backdrop-blur-sm">
          {/* Glassmorphism overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-color1/5  opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          {/* Product Image */}
          <div className="relative h-56 overflow-hidden rounded-t-2xl bg-gradient-to-br from-color1/30 via-white to-color2/50 ">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain group-hover:scale-110 transition-all duration-700 p-6 filter group-hover:saturate-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-color1 text-white shadow-lg capitalize tracking-wide">
                {product.category}
              </span>
            </div>

            {/* Wishlist */}
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleWishlist();
                }}
                className="p-2.5 bg-white/90 dark:bg-gray-700 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
              >
                {isInWishlist ? (
                  <AiFillHeart className="h-5 w-5 text-red-500" />
                ) : (
                  <CiHeart className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="relative p-5 flex flex-col flex-grow z-10">
            {/* Rating */}
            {showRating && product.rating && (
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-0.5">
                    {renderStars(product.rating.rate)}
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {product.rating.rate}/5
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                  {product.rating.count} reviews
                </span>
              </div>
            )}

            <h3 className="font-bold text-lg mb-3 line-clamp-2">
              {truncateText(product.title, 60)}
            </h3>

            <p className="text-sm mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">
              {truncateText(product.description, 100)}
            </p>

            {/* Price + Add Button */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-1">
                <span className="text-2xl font-bold text-color1 dark:text-blue-400">
                  ${product.price.toFixed(2)}
                </span>
                {cartItem && (
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                    Sepette: {cartItem.quantity}
                  </span>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddToCart();
                }}
                disabled={isCartLoading}
                className="p-3 rounded-xl border-2 border-blue-200 text-color1 hover:bg-color1 hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCartLoading ? (
                  <div className="h-5 w-5 border-2 border-color1 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <CiShoppingCart className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
