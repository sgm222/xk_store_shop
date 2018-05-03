import {
    FETCHING_ADDRESS_SUCCESS,
    FETCHING_ADDRESS_FAILURE,
    DEL_ADDRESS
} from './constants';
import { fetchAddress, fetchAddressById } from './api';

export const getAddress = () => {
    return (dispatch, getState) => {
        fetchAddress().then(
            (response) => {
                console.log(response.data);
                return response.data;
            }
        ).then(
            (json) => {
                if (json.length !== 0) {
                    dispatch({ type: FETCHING_ADDRESS_SUCCESS, payload: json });
                } else {
                    dispatch({ type: FETCHING_ADDRESS_FAILURE});
                }
            }
        ).catch(
            console.error('error')
        )
    }
};
export const getAddressById = (id) => {
        fetchAddressById(id).then(
            (response) => {
                return response.data;
            }
        ).then(
            (json) => {
                if (json.length !== 0) {
                   return json;
                } else {
                    return null;
                }
            }
        ).catch(
            console.error('error')
        )
};
export const deleteById = (addressId) => {
    return (dispatch, getState) => {
        let body = {
            "addressId": addressId
        };
        let url = "/api/address/delAddressById";
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
                    dispatch({ type: DEL_ADDRESS, payload: addressId });
                }
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
        }); 
    }
};

