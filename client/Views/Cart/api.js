import axios from 'axios';

export const fetchCart = () => {
  return axios.get(`/api/cart/getCart`);
};
export const saveCart = () => {
  return axios.post(`/api/cart/saveCart`);
};