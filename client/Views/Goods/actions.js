import {
  FETCHING_GOODS_SUCCESS,
  FETCHING_GOODS_FAILURE,
  FETCHING_GOODSDETAIL_SUCCESS,
  FETCHING_GOODSDETAIL_FAILURE,
} from './constants';
import {
  fetchGoods,
  fetchGoodsById
} from './api';

export const getGoods = () => {
  return (dispatch, getState) => {
    fetchGoods().then(
        (response) => {
            return response.data;
        }
    ).then(
        (json) => {
            if (json.length !== 0) {
              dispatch({ type: FETCHING_GOODS_SUCCESS, payload: json });
            } else {
              dispatch({ type: FETCHING_GOODS_FAILURE});
            }
        }
    ).catch(
      //dispatch({ type: FETCHING_USER_FAILURE })
    )
  }
};
export const getGoodsById = (goodsId) => {
    return (dispatch, getState) => {
      fetchGoodsById(goodsId).then(
          (response) => {
              return response.data;
          }
      ).then(
          (json) => {
              if (json.length !== 0) {
                dispatch({ type: FETCHING_GOODSDETAIL_SUCCESS, payload: json });
              } else {
                dispatch({ type: FETCHING_GOODSDETAIL_FAILURE});
              }
          }
      ).catch(
        //dispatch({ type: FETCHING_USER_FAILURE })
      )
    }
};
export const getCartGoods = (goodsId) => {
    return (dispatch, getState) => {
      fetchGoodsById(goodsId).then(
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
        //dispatch({ type: FETCHING_USER_FAILURE })
      )
    }
};

export const fetchSignIn = (body) => {
      let url = "/api/user/SignIn";
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
              console.log(JSON.stringify(json));
              if (json.result) {
                  if (json.result.redirect) {
                      //window.location = json.result.redirect;
                  }
              } else if (json.error) {
                  dispatch(SIGNIN_FAILURE);
              }
          }
      ).catch(
          dispatch(SIGNIN_FAILURE)
      )
};
