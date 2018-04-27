import {
  FETCHING_GOODS_SUCCESS,
  FETCHING_GOODS_FAILURE,
  FETCHING_CARTGOODS_SUCCESS,
  FETCHING_CARTGOODS_FAILURE,
} from './constants';

const initialState = {
  fetchingGoods: false,
  fetchingCartGoods: false,
  goods: null,
  cartgoods: [],
  error: null,
};

export const goodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_GOODS_SUCCESS:
      return Object.assign({}, state, {
        fetchingGoods: true,
        goods: action.payload,
        error: null,
      });

    case FETCHING_GOODS_FAILURE:
      return Object.assign({}, state, {
        fetchingGoods: false,
        error: 'Unable to fetch user profile. Please check out for correct username.',
      });

    case FETCHING_CARTGOODS_SUCCESS:
        state.fetchingCartGoods = true;
        state.cartgoods.push(action.payload);
        return state;
        
    case FETCHING_CARTGOODS_FAILURE:
      return Object.assign({}, state, {
        fetchingCartGoods: false,
        error: 'Unable to fetch user profile. Please check out for correct username.',
      });
    default:
      return state;
  }
};
