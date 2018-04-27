import {
    FETCHING_ORDER_SUCCESS,
    FETCHING_ORDER_FAILURE,
  } from './constants';
  
  const initialState = {
    fetchingOrder: false,
    order: null,
    error: null,
  };
  
  export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCHING_ORDER_SUCCESS:
        return Object.assign({}, state, {
          fetchingOrder: true,
          order: action.payload,
          error: null,
        });
  
      case FETCHING_ORDER_FAILURE:
        return Object.assign({}, state, {
          fetchingOrder: false,
          error: 'Unable to fetch ',
        });
  
      default:
        return state;
    }
  };
  