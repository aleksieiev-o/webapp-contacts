import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.PROD ? '/backend' : 'http://localhost:3000/backend',
  headers: {
    'Content-Type': 'application/json',
  },
});
