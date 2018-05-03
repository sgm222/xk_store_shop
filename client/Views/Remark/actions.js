import {
    FETCHING_REMARK_SUCCESS,
    FETCHING_REMARK_FAILURE,
  } from './constants';
  import {
    fetchRemarkById
  } from './api';

  export const getRemark = (goodsId) => {
      return (dispatch, getState) => {
        fetchRemarkById(goodsId).then(
            (response) => {
                return response.data;
            }
        ).then(
            (json) => {
                if (json.length !== 0) {
                  dispatch({ type: FETCHING_REMARK_SUCCESS, payload: json });
                } else {
                  dispatch({ type: FETCHING_REMARK_FAILURE});
                }
            }
        ).catch(
          //dispatch({ type: FETCHING_USER_FAILURE })
        )
      }
  };

  