'use client';
import Image from 'next/image';
import React from 'react';

type CartItemProps = {
  item: any;
  index: number;
  updateQuantity: (index: number, delta: number) => void;
  removeItem: (index: number) => void;
};

export default function CartItem({ item, index, updateQuantity, removeItem }: CartItemProps) {
  return (
    <div>
      <li className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-md rounded-xl shadow-md border border-gray-200 ">
      {/* 🔹 Product detayına gitmek için Link yerine <a> bırakılmış */}
      <a href={`/product/${item.id}`} className="flex gap-4 flex-1">
        <div className="relative w-20 h-20 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain rounded-md"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate cursor-pointer hover:text-primary-600 transition-colors  hover:color1">
            {item.title}
          </h3>
          <p className="text-gray-500 text-sm">{item.category.toLowerCase()}</p>
          <p className="text-lg font-bold text-primary-600">
            ${item.price.toFixed(2)}
          </p>
        </div>
      </a>

      {/* 🔹 İşlem butonları */}
      <div className="flex items-center  space-x-3">
        <div className="flex gap-2">

          <button
            onClick={() => updateQuantity(index, -1)}
            className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
             disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="w-10 text-center font-semibold">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(index, 1)}
            className="px-2 py-1 bg-gray-200 rounded"
            disabled={item.quantity >= 10}
          >
            +
          </button>
        </div>
        <button
          onClick={() => removeItem(index)}
          className="p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          Remove
        </button>
      </div>
      <div className="text-right min-w-[80px]">
        <p className="font-bold text-lg text-gray-900 dark:text-gray-100">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      </li>
      
    </div>
    
  );
}
