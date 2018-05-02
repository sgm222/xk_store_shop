import {
    FETCHING_ADDRESS_SUCCESS,
    FETCHING_ADDRESS_FAILURE
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

