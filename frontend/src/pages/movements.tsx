import { useEffect, useState } from 'react';
import { getMovements } from '../services/api';
import { StockMovements } from '@/models/stock-movements';
import MovementsList from '../components/MovementsList';

export default function Movements() {
  const [movements, setMovements] = useState<StockMovements[]>([]);

  useEffect(() => {
    getMovements()
      .then(res => setMovements(res.data))
      .catch(err => console.error('Error al cargar listado de movimientos', err));
  }, []);

  return (
    <div>
      <h1>Lista de Movimientos</h1>
      <MovementsList items={movements} />
    </div>
  );
}