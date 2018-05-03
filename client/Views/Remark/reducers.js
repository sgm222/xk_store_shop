import {
    FETCHING_REMARK_SUCCESS,
    FETCHING_REMARK_FAILURE,
  } from './constants';
  
  const initialState = {
    fetchingRemark: false,
    remark: null,
    error: null,
  };
  
  export const remarkReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCHING_REMARK_SUCCESS:
        return Object.assign({}, state, {
          fetchingRemark: true,
          remark: action.payload,
          error: null,
        });
  
      case FETCHING_REMARK_FAILURE:
        return Object.assign({}, state, {
          fetchingRemark: false,
          error: 'Unable to fetch',
        });
  
      default:
        return state;
    }
  };
  