'use client';

import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';


export default function Page() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} showRating />
        ))}
      </div>
    </div>
  );
}
