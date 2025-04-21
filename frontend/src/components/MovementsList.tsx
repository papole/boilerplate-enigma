import { StockMovements } from '../models/stock-movements';
import styles from './style.module.css';

interface Props {
  items: StockMovements[];
}

export default function MovementsList({ items }: Props) {
  if (!items.length) return <p>No hay movimientos.</p>;

  return (
    <div className={styles.list_products}>
      {items.map((movimiento) => (
        <div className={styles.list_item} key={movimiento.id}>
          <strong>{movimiento.quantity} {movimiento.typemv}</strong>
          <strong>{movimiento.product.name}</strong> 
        </div>
      ))}
    </div>
  );
}
