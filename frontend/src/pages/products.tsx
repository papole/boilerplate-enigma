import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { Product } from '../models/product';
import ProductList from '../components/ProductList';
import ProductModal from '../components/modal/modal';

import styles from './style.module.css';
const mockProduct = {
  id:'',
  name: 'Producto demo',
  sku: 'ABC123',
  stock: 50,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<null | typeof mockProduct>(null);

  const openForCreate = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openForEdit = async (product: typeof mockProduct) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const loadProducts = () => {
    getProducts()
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error al cargar productos', err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSaved = () => {
    loadProducts();
    setModalOpen(false);
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <button onClick={() => openForCreate()} className={styles.boton} >Nuevo producto</button>

      <ProductList 
        items={products} 
        onEdit={openForEdit}
        addStock={handleSaved}
      />

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={editingProduct || undefined}
        onSaved={handleSaved}
      />

    </div>
  );
}
