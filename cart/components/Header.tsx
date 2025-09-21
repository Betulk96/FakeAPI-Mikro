'use client';

import Link from 'next/link';
import { PiBasket } from "react-icons/pi";
import { IoMdClose } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  const router = useRouter();
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 🔹 Sepetteki toplam ürün sayısını takip et
  useEffect(() => {
    const syncCart = () => {
      const raw = localStorage.getItem('micro_cart') || '[]';
      const cart = JSON.parse(raw);
      const total = cart.reduce(
        (sum: number, item: any) => sum + (item.quantity || 1),
        0
      );
      setTotalItems(total);
    };

    syncCart();

    // localStorage değişikliklerini dinle
    window.addEventListener('storage', syncCart);

    return () => {
      window.removeEventListener('storage', syncCart);
    };
  }, []);

  return (
    <header className="bg-gradient-secondary dark:bg-gradient-dark shadow-sm sticky top-0 z-50">
      <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <a
            href={`/`}
            className="flex items-center space-x-2 text-2xl font-bold text-gradient text-gray-700 hover:shadow-lg transition-colors rounded-xl bg-color1/30 backdrop-blur-md p-2 shadow-sm shadow-color22"
          >
            <span className="text-center text-gradient-animate-dark">
              FAKE STORE
            </span>
          </a>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4">
              <a
                href={`/`}
                className="hover:shadow-lg transition-colors rounded-xl bg-white/10 backdrop-blur-md border dark:border-gray-600 p-2 text-sm shadow-sm shadow-color22"
              >
                Home
              </a>
            
            </nav>

            {/* Cart */}
            <Link
              href={`/cart`}
              className="relative flex items-center space-x-2 hover:shadow-lg transition-colors rounded-xl bg-white/10 backdrop-blur-md border dark:border-gray-600 p-2 text-sm shadow-sm shadow-color22"
            >
              <PiBasket className="w-5 h-auto" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-color3 text-color1 text-xs rounded-lg h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
