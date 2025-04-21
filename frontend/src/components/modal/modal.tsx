import { useEffect, useState } from 'react';
import styles from './style.module.css';
import { Product } from '../../models/product';
import { addProduct, editProduct } from '../../services/api';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onSaved?: () => void;
}

export default function ProductModal({ isOpen, onClose, product, onSaved }: ModalProps) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSku(product.sku);
      setStock(product.stock);
    } else {
      setName('');
      setSku('');
      setStock(0);
    }
  }, [product, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { name, sku, stock };

    try {
      if (product && product.id) {
        await editProduct(product.id, payload)
      } else {
        await addProduct(payload)
      }

      onSaved?.();
      onClose();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>{product ? 'Editar producto' : 'Nuevo producto'}</h2>

        <form onSubmit={handleSubmit} className={styles.from_product}>
          <input
            className={styles.input_text}
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className={styles.input_text}
            type="text"
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />
          <input
            className={styles.input_text}
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            required
          />
          <button type="submit" className={styles.botonaction}>
            {product ? 'Actualizar' : 'Guardar'}
          </button>
        </form>
      </div>
    </div>
  );
}