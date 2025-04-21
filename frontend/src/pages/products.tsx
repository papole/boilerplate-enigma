import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { Product } from '../models/product';
import ProductList from '../components/ProductList';
import ProductModal from '../components/modal/modal';

import styles from './style.module.css';
import { Pagination } from '../models/pagination';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<null | Product>(null);
  const [pagination, setPagination] = useState<Pagination>();

  const openForCreate = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openForEdit = async (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const loadProducts = (offset: number = 0) => {
    console.log('loadProducts',offset)
    getProducts(offset)
      .then(res => {
        setPagination(
          {
            total:res.total, 
            currentPage:res.currentPage,
            totalPages:res.totalPages
          }
        )
        setProducts(res.data)
      })
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
        onChangeOffset={loadProducts}
        setPagination={pagination}
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
