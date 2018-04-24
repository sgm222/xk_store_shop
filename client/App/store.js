import { createStore, applyMiddleware, compose } from 'redux';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { userReducer } from '../Views/SignIn/reducers';
import { goodsReducer } from '../Views/Goods/reducers';
import { goodsDetailReducer } from '../Views/Goods/detailreducers';
import { cartReducer } from '../Views/Cart/reducers';
// root reducer for app
const rootReducer = combineReducers({
  user: userReducer,
  goods: goodsReducer,
  goodsDetail: goodsDetailReducer,
  cart: cartReducer
});

// dev tool extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// application store
let store = createStore(
  rootReducer,
  /* preloaded state, */
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

export default store;
