import { useEffect, useState } from 'react';
import { getMovements } from '../services/api';
import { StockMovements } from '@/models/stock-movements';
import MovementsList from '../components/MovementsList';
import { Pagination } from '../models/pagination';

export default function Movements() {
  const [movements, setMovements] = useState<StockMovements[]>([]);
  const [pagination, setPagination] = useState<Pagination>();

  const loadMovements = (offset: number = 1) => {    
    getMovements(offset)
      .then(res => {
          setPagination(
            {
              total:res.total, 
              currentPage:res.currentPage,
              totalPages:res.totalPages
            }
          )
          setMovements(res.data)
        }
      )
      .catch(err => console.error('Error al cargar productos', err));
  };

  useEffect(() => {
    loadMovements()
  }, []);

  return (
    <div>
      <h1>Lista de Movimientos</h1>
      <MovementsList 
        items={movements}
        setPagination={pagination}
        onChangeOffset={loadMovements}
      />
    </div>
  );
}