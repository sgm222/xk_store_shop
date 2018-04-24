/**
 * user profile apis
 */

import axios from 'axios';

export const fetchGoods = () => {
  return axios.get('/api/goods/getGoods');
};
export const fetchGoodsById = (goodsId) => {
  return axios.get(`/api/goods/getGoodsById/${goodsId}`);
};