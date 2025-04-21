import { Product } from '../models/product';
import styles from './style.module.css';
import { handleMovement } from '../services/api';
import { TypeMovement } from '@/common/enum/type_movement';

interface Props {
  items: Product[];
  onEdit: (product: Product) => void;
  addStock: () => void;
}

export default function ProductList({ items, onEdit, addStock }: Props) {
  if (!items.length) return <p>No hay productos.</p>;
  
  const editStock = async (product: Product, typeMovement:TypeMovement) =>{
    if(product.id){
      await handleMovement(product.id,typeMovement)
      addStock()
      return
    }
  }

  return (
    <div className={styles.list_products}>
      {items.map((product) => (
        <div className={styles.list_item} key={product.id}>
          <div>
            <strong>{product.name}</strong> 
          </div>
          <div style={{ marginLeft: 'auto' }}>
            stock: {product.stock}
            <button onClick={() => editStock(product,TypeMovement.IN)} className={styles.botonaction}>+</button> 
            <button onClick={() => editStock(product,TypeMovement.OUT)}  className={styles.botonaction}>-</button> 
            <button onClick={() => onEdit(product)} className={styles.botonaction}>Editar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
