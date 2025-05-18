import axios from 'axios';
import {tokenStorage} from '@state/storage';
import {useAuthStore} from '@state/authStore';
import {REAL_MOBILE_BASE_URL} from './config';
import {resetAndNavigate} from '@utils/NavigationUtils';
import {appAxios} from './apiInterceptors';

export const customerLoginService = async (phone: string) => {
  try {
    const response = await axios.post(
      `${REAL_MOBILE_BASE_URL}/customer/login`,
      {
        phone,
      },
    );
    console.log('🚀 ~ customerLoginService ~ response:', response.data);
    if (response.data) {
      resetAndNavigate('ProductDashboard');
    }

    const {accessToken, refreshToken, customer} = response.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);

    //set user using Zustand State
    const {setUser} = useAuthStore.getState();
    setUser(customer);
  } catch (error) {
    console.log('login error', error);
  }
};

export const DeliveryPartnerLoginService = async (
  email: string,
  password: string,
) => {
  try {
    const response = await axios.post(
      `${REAL_MOBILE_BASE_URL}/deliveryPartner/login`,
      {email, password},
    );

    if (response?.data) {
      resetAndNavigate('DeliveryDashboard');
    }

    const {accessToken, refreshToken, deliveryPartner} = response.data;
    tokenStorage.set('accessToken', accessToken);
    tokenStorage.set('refreshToken', refreshToken);

    //set user using Zustand State
    const {setUser} = useAuthStore.getState();
    setUser(deliveryPartner);
  } catch (error) {
    console.log('login error', error);
  }
};

// have access token but refresh token expire so reCreate refresh token
export const refresh_Token = async () => {
  try {
    const refreshToken = tokenStorage.getString('refreshToken');
    const response = await axios.post(`${REAL_MOBILE_BASE_URL}/refresh-token`, {
      refreshToken,
    });

    const new_access_token = response.data.accessToken;
    const new_refresh_token = response.data.refreshToken;

    tokenStorage.set('accessToken', new_access_token);
    tokenStorage.set('refreshToken', new_refresh_token);
    return new_access_token;
  } catch (error) {
    console.log('Refresh Token Error', error);
    tokenStorage.clearAll();
    resetAndNavigate('CutomerLogin');
  }
};

// check access token have or not if then set in headers
export const reFetchUser = async (setUser: any) => {
  try {
    const response = await appAxios.get('/user');
    setUser(response.data.user);
  } catch (error) {
    console.log('reFetchUser error', error);
  }
};

// update user Location after update reFetchUser
export const updateUserLocation = async (data: any, setUser: any) => {
  try {
    //Use it when you want to update only certain fields of a resource,
    // rather than replacing the whole object (which PUT does).
    const response = await appAxios.patch('/user', data);
    reFetchUser(setUser);
  } catch (error) {
    console.log(' update user location error', error);
  }
};
