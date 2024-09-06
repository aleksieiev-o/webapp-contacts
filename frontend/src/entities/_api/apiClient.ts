import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;
// eslint-disable-next-line no-console
console.log(11, baseURL);

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
