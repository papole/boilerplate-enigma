import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { Product } from '../models/product';
import ProductList from '../components/ProductList';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error al cargar productos', err));
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ProductList items={products} />
    </div>
  );
}
