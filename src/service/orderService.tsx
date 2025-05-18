import {appAxios} from './apiInterceptors';
import {BRANCH_ID} from './config';

export const createOrder = async (item: any, totalPrice: number) => {
  try {
    const response = await appAxios.post('/order', {
      item: item,
      branch: BRANCH_ID,
      totalPrice: totalPrice,
    });
    console.log('🚀 ~ createOrder ~ response:', response);
    return response.data;
  } catch (error) {
    console.log('Create order error', error);
    return null;
  }
};

export const getOrderById = async (id: number) => {
  try {
    const response = await appAxios.post(`/order/${id}`);
    return response.data;
  } catch (error) {
    console.log('fetch by id order error', error);
    return null;
  }
};
