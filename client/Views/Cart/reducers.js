import {ADD_PRODUCT, DEL_CART, DEL_COUNT, CLEAR_CART, FETCHING_CART_SUCCESS, FETCHING_CART_FAILURE} from './constants'

const initialState = {
  addedIds: [],
  quantityById: {}
}

const addIds = (state = initialState.addedIds, action) => {
  switch (action.type) {
    case FETCHING_CART_SUCCESS:
      action.payload.map((item) => {
        if(state.indexOf(item.goodsId) === -1) {
          state.push(item.goodsId);
        }
      })
      return state;
    case FETCHING_CART_FAILURE:
      return state = [];
    case ADD_PRODUCT:
      if (state.indexOf(action.payload) !== -1) {
        return state
      }
      return [
        ...state,
        action.payload
      ]
    case DEL_CART:
      var id = state.indexOf(action.payload)
      state.splice(id, 1)
      return state

    case CLEAR_CART:
      state = []
      return state
      
    default:
      return state


  }
}
const quantityId = (state = initialState.quantityById, action) => {
  switch (action.type) {
    case FETCHING_CART_SUCCESS:
      action.payload.map((item) => {
        if(!state[item.goodsId]) {
          state[item.goodsId] = item.count
        }
      })
      return state;

    case FETCHING_CART_FAILURE:
      return state = {};

    case ADD_PRODUCT:
      var {payload} = action
      return {
        ...state,
        [payload]: (state[payload] || 0) + 1
      };

    case DEL_COUNT:
      return {
        ...state,
        [payload]: state[payload] - 1
      }

    case DEL_CART:
      var {payload} = action
      delete state[payload]
      return {
        ...state
      }

    case CLEAR_CART:
      state = {}
      return state

    default:
      return state
  }
}


export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return {
        addIds: addIds(state.addIds, action),
        quantityId: quantityId(state.quantityId, action)
      }
  }
}

