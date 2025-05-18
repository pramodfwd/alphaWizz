import {Platform} from 'react-native';
export const REAL_MOBILE_BASE_URL = 'http://192.168.249.26:3000/api';
export const BASE_URL =
  Platform.OS === 'android'
    ? REAL_MOBILE_BASE_URL
    : 'http://localhost:3000/api';

export const SOCKET_URL =
  Platform.OS === 'android' ? REAL_MOBILE_BASE_URL : 'http://localhost:3000';

// if we are usong mobile devices then use this server

export const MOBILE_BASE_URL = 'http://172.20.10.4:3000/api';
export const MOBILE_SOCKET_URL = 'http://172.20.10.4:3000';
export const BRANCH_ID = '680cada4f5be9a72ba98f5dd';
