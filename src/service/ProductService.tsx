import axios from 'axios';
import {REAL_MOBILE_BASE_URL} from './config';

export const getAllCategories = async () => {
  console.log('fetching categories');
  try {
    const response = await axios.get(`${REAL_MOBILE_BASE_URL}/categories`);

    return response.data;
  } catch (error) {
    console.log('Api getting cateroies Error', error);
  }
};
export const getProductsByCategoryId = async ({id}: any) => {
  console.log('productId', id);
  try {
    const response = await axios.get(`${REAL_MOBILE_BASE_URL}/products/${id}`);
    console.log('prduct', response.data);
    return response.data;
  } catch (error) {
    console.log('Api getting cateroies Error', error);
  }
};
