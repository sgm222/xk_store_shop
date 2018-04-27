import axios from 'axios';

export const fetchCart = () => {
  return axios.get(`/api/cart/getCart`);
};
export const saveCart = () => {
  return axios.post(`/api/cart/saveCart`);
};
export const clearCarts = () => {
  return axios.post(`/api/cart/clearCart`);
};
export const getAddress = () => {
  return axios.post(`/api/address/getAddressById`);
};