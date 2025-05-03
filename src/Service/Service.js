import axios from 'axios';
  
const isDebug = false
const baseURL = isDebug ? 'http://127.0.0.1:8000/' : 'https://client-application-i1q3.onrender.com/'

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const apiPublic = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
   const token = localStorage.getItem('access_token');
   if (token) {
     config.headers.Authorization = `Bearer ${token}`;
   }
  return config;
});
