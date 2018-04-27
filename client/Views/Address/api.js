import axios from 'axios';

export const fetchAddress = () => {
  return axios.get(`/api/address/getUserAddress`);
};
export const fetchAddressById = (addressId) => {
  return axios.get(`/api/address/getAddressById/${addressId}`);
};