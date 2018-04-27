import {
    ADD_PRODUCT,
    CLEAR_CART,
    FETCHING_CART_SUCCESS,
    FETCHING_CART_FAILURE,
    DEL_COUNT,
    DEL_CART,
    CLEAR_CART_FAILURE
} from './constants';
import { fetchCart, clearCarts } from './api';

export const handleradd = (goodsId, shopId) => {
    return (dispatch, getState) => {
        let body = {
        "shopId": shopId,
        "goodsId": goodsId
        };
        let url = "/api/cart/saveCart";
        fetch(url, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'     //很重要，设置session,cookie可用
        }).then(
            (response) => {
                return response.json();
            }
        ).then(
            (json) => {
                if(json.result.success) {
                    dispatch({ type: ADD_PRODUCT, payload: goodsId });
                }
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
        }); 
    }
};
export const handlerdel = (goodsId, shopId) => {
    return (dispatch, getState) => {
        let body = {
        "shopId": shopId,
        "goodsId": goodsId
        };
        let url = "/api/cart/delCount";
        fetch(url, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'     //很重要，设置session,cookie可用
        }).then(
            (response) => {
                return response.json();
            }
        ).then(
            (json) => {
                if(json.result.success) {
                    dispatch({ type: DEL_COUNT, payload: goodsId });
                }
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
        }); 
    }
};
export const deleteById = (goodsId) => {
    return (dispatch, getState) => {
        let body = {
            "goodsId": goodsId
        };
        let url = "/api/cart/delCartById";
        fetch(url, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'     //很重要，设置session,cookie可用
        }).then(
            (response) => {
                return response.json();
            }
        ).then(
            (json) => {
                if(json.result.success) {
                    dispatch({ type: DEL_CART, payload: goodsId });
                }
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
        }); 
    }
};
export const getCart = () => {
    return (dispatch, getState) => {
        fetchCart().then(
            (response) => {
                return response.data;
            }
        ).then(
            (json) => {
                if (json.length !== 0) {
                    dispatch({ type: FETCHING_CART_SUCCESS, payload: json });
                } else {
                    dispatch({ type: FETCHING_CART_FAILURE});
                }
            }
        ).catch(
            console.error('error')
        )
    }
};
export const clearCart = () => {
    return (dispatch, getState) => {
        clearCarts().then(
            (response) => {
                return response.data;
            }
        ).then(
            (json) => {
                if (json.length !== 0) {
                    dispatch({ type: CLEAR_CART });
                } else {
                    dispatch({ type: CLEAR_CART_FAILURE});
                }
            }
        ).catch(
            console.error('error')
        )
        
    }
};

  