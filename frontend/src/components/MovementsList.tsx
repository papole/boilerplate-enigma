import { StockMovements } from '../models/stock-movements';
import styles from './style.module.css';
import { TypeOffset } from '../common/enum/type_offset';
import { useState } from 'react';
import { Pagination } from '../models/pagination';

interface Props {
  items: StockMovements[];
  setPagination?: Pagination;
  onChangeOffset: ( offset:number ) => void;
}


export default function MovementsList({ items,setPagination, onChangeOffset }: Props) {
  const [page, setPage] = useState<number>(1);

  if (!items.length) return <p>No hay movimientos.</p>;
  
  const changeOffset = (typeoffset: TypeOffset)=>{    
    let newPage = page
    if(typeoffset === TypeOffset.BACK && page == 1 ) return
    switch (typeoffset) {
      case TypeOffset.BACK:
        newPage = page - 1
        break;    
      case TypeOffset.AFTER:
        newPage = page + 1
        break;    
    }   
      
    setPage(newPage)            
    onChangeOffset(newPage)
  }
  return (
    <div className={styles.list_products}>
      {items.map((movimiento) => (
        <div className={styles.list_item} key={movimiento.id}>
          <strong>{movimiento.quantity} {movimiento.typemv}</strong>
          <strong>{movimiento.product.name}</strong> 
        </div>
      ))}
      <div>
        <button disabled={setPagination?.currentPage == 1} onClick={() => changeOffset(TypeOffset.BACK)} className={styles.botonaction}> {'<<'} </button>
        <button disabled={setPagination?.totalPages == page} onClick={() => changeOffset(TypeOffset.AFTER)} className={styles.botonaction}> {'>>'} </button>
      </div>
    </div>
  );
}
