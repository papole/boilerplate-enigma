import axios from 'axios';
import { TypeMovement } from '../common/enum/type_movement';
import { DataProduct } from '../models/product';
import * as dotenv from 'dotenv';

dotenv.config();

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
console.log(process.env.HOST_API)
export const getProducts = async (page:number = 0) => {
  return api.get('/product',{params:{limit:5,page}}).then((res) => {return res.data});
};
export const getMovements = async (page = 0) => {
  return api.get('/stock-movement',{params:{limit:5,page}}).then((res) => {return res.data});
}

export const handleMovement = async (productId: string, typeMovement: TypeMovement, stock = 1) => {
  try {
    await api.patch(
      `/product/${productId}`,
      { stock },
      {
        params: { typeMovement }
      }
    ).catch(err => console.log(err) );
  } catch (error) {
    console.error('Error al realizar movimiento OUT:', error);
  }
};

export const addProduct = async (data:DataProduct)=>{
  try {
    await api.post(
      `/product`,{...data}
    ).catch(err => console.log(err));
  } catch (error) {
    console.error('Error al dar de alta un producto:', error);
  }
}

export const editProduct = async (id:string, data:DataProduct)=>{
  try {    
    await api.patch(
      `/product/${id}`,{...data}
    ).catch(err => console.log(err));
  } catch (error) {
    console.error('producto editado:', error);
  }
}

export default api;