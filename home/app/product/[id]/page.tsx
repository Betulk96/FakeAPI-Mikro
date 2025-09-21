'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductByID from '../../../components/ProductByID';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/' + id)
      .then(r => r.json())
      .then(setProduct);
  }, [id]);
  if (!product) return <div>Loading...</div>;
  return (
    <div >
     <ProductByID product={product} />
    </div>
  )
}
