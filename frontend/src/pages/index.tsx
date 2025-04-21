import { useState } from 'react';

import styles from './style.module.css';
import ProductsPage from './products';
import Movements from './movements';

type View = 'products' | 'new-product' | 'movements';

export default function Home() {

  const [currentView, setCurrentView] = useState<View>('products');

  const renderView = () => {
    switch (currentView) {
      case 'products':
        return <ProductsPage />;
      case 'movements':
        return <Movements />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.boton} onClick={() => setCurrentView('products')}>Ver productos</button>
        <button className={styles.boton} onClick={() => setCurrentView('movements')}>Movimientos</button>
      </div>

      <div className={styles.content}>
        {renderView()}
      </div>

    </div>
  );
}