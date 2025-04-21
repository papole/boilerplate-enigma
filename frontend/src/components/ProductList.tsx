import { Product } from '../models/product';
import styles from './style.module.css';
import { handleMovement } from '../services/api';
import { TypeMovement } from '@/common/enum/type_movement';
import { useState } from 'react';
import { TypeOffset } from '../common/enum/type_offset';
import { Pagination } from '../models/pagination';

interface Props {
  items: Product[];
  onEdit: (product: Product) => void;
  addStock: () => void;
  setPagination?: Pagination;
  onChangeOffset: ( offset:number ) => void;
}

export default function ProductList({ items, setPagination ,onEdit, addStock, onChangeOffset }: Props) {
  const [page, setPage] = useState<number>(1);

  if (!items.length) return ;
  
  const editStock = async (product: Product, typeMovement:TypeMovement) =>{
    if(product.id){
      await handleMovement(product.id, typeMovement)
      addStock()
      return
    }
  }

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
      <div>
        <button disabled={setPagination?.currentPage == 1} onClick={() => changeOffset(TypeOffset.BACK)} className={styles.botonaction}> {'<<'} </button>
        <button disabled={setPagination?.totalPages == page} onClick={() => changeOffset(TypeOffset.AFTER)} className={styles.botonaction}> {'>>'} </button>
      </div>
    </div>
  );
}
