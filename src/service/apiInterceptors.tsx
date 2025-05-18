// test giving the before the response to the client

import axios from 'axios';
import {REAL_MOBILE_BASE_URL} from './config';
import {refresh_Token} from './authService';
import {tokenStorage} from '@state/storage';

export const appAxios = axios.create({
  baseURL: REAL_MOBILE_BASE_URL,
});

// jab yha se request bhejenge,jo accesstoken h use hearder me set krnge
appAxios.interceptors.request.use(async config => {
  const accessToken = tokenStorage.getString('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// or jab responce ayega tab
appAxios.interceptors.response.use(
  res => res, // agr responce aya to tik
  async err => {
    // agr error aya to again accessToken generate krke api call again krenge
    if (err.response && err.response.status === 401) {
      // 401 =>unAthorized
      try {
        const newAccessToken = await refresh_Token();
        if (newAccessToken) {
          err.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(err.config); //retry original request
        }
      } catch (error) {
        console.log('Error refreshing token');
      }
    }
    // agr responce error 401 ni h meand kuch or gadbad h
    if (err.response && err.response.status !== 401) {
      const errMessage = err.response.data.message || 'somthing went wrong';
      console.log(errMessage);
    }
    return Promise.reject(err);
  },
);
