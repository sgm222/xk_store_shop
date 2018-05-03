import {
    FETCHING_ADDRESS_SUCCESS,
    FETCHING_ADDRESS_FAILURE,
    DEL_ADDRESS
  } from './constants';
  
  const initialState = {
    fetchingAddress: false,
    address: null,
    error: null
  };
  
  export const addressReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCHING_ADDRESS_SUCCESS:
        return Object.assign({}, state, {
          fetchingAddress: true,
          address: action.payload,
          error: null,
        });
  
      case FETCHING_ADDRESS_FAILURE:
        return Object.assign({}, state, {
          fetchingAddress: false,
          error: 'Unable to fetch user profile. Please check out for correct username.',
        });
      
      case DEL_ADDRESS:
        var id = state.address.indexOf(action.payload)
        state.address.splice(id, 1)
        return state;

      default:
        return state;
    }
  };
  