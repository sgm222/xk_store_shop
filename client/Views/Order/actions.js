import {
    FETCHING_ORDER_SUCCESS,
    FETCHING_ORDER_FAILURE,
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