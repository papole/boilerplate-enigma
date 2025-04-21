import axios from 'axios';
import { TypeMovement } from '../common/enum/type_movement';
import { DataProduct } from '../models/product';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getProducts = () => api.get('/product',{params:{limit:8,offset:0}});
export const getMovements = () => api.get('/stock-movement',{params:{limit:8,offset:0}});

export const handleMovement = async (productId: string, typeMovement: TypeMovement, stock = 1) => {
  try {
    await axios.patch(
      `http://localhost:3000/api/product/${productId}`,
      { stock },
      {
        params: { typeMovement }
      }
    ).catch(err => console.log );
  } catch (error) {
    console.error('Error al realizar movimiento OUT:', error);
  }
};

export const addProduct = async (data:DataProduct)=>{
  try {
    await axios.post(
      `http://localhost:3000/api/product`,{...data}
    ).catch(err => console.log);
  } catch (error) {
    console.error('Error al dar de alta un producto:', error);
  }
}

export const editProduct = async (id:string, data:DataProduct)=>{
  try {
    await axios.patch(
      `http://localhost:3000/api/product/${id}`,{...data}
    ).catch(err => console.log);
  } catch (error) {
    console.error('producto editado:', error);
  }
}

export default api;