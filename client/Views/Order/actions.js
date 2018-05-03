import {
    FETCHING_ORDER_SUCCESS,
    FETCHING_ORDER_FAILURE,
    DEL_ORDER
} from './constants';
import { fetchOrder } from './api';

export const getOrder = () => {
    return (dispatch, getState) => {
        fetchOrder().then(
            (response) => {
                return response.data;
            }
        ).then(
            (json) => {
                if (json.length !== 0) {
                    dispatch({ type: FETCHING_ORDER_SUCCESS, payload: json });
                } else {
                    dispatch({ type: FETCHING_ORDER_FAILURE});
                }
            }
        ).catch(
            console.error('error')
        )
    }
};
export const deleteById = (orderId) => {
    return (dispatch, getState) => {
        let body = {
            "orderId": orderId
        };
        let url = "/api/order/delOrderById";
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
                    dispatch({ type: DEL_ORDER, payload: orderId });
                }
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
        }); 
    }
};
export const modifyById = (orderId, status) => {
    return (dispatch, getState) => {
        let body = {
            "orderId": orderId,
            "status": status
        };
        let url = "/api/order/modifyOrderById";
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
                if (json.result) {
                    if (json.result.redirect) {
                        window.location = json.result.redirect;
                    }
                } else if (json.error) {
                    console.error('error');
                }
            }
        ).catch(
            console.error('parsing failed')
        ); 
    }
};
