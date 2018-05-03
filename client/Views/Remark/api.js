import axios from 'axios';

export const fetchRemarkById = (goodsId) => {
  return axios.get(`/api/remark/getRemarkById/${goodsId}`);
};