import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import * as styles from './styles';
import appLayout from 'SharedStyles/appLayout.css';

class NaveSide extends Component {
  render() {
    const {cart} = this.props;
    return (
        <div className="tip">
        <div id="sidebar">
          <div id="wrap">
            <div id="prof" className="item ">
              <a href="# ">
                <span className="setting "></span>
              </a>
              <div className="ibar_login_box status_login ">
                <div className="avatar_box ">
                  <p className="avatar_imgbox "><img src="/build/images/no-img_mid_.jpg " /></p>
                  <ul className="user_info ">
                    <li>用户名：sl1903</li>
                    <li>级&nbsp;别：普通会员</li>
                  </ul>
                </div>
                <div className="login_btnbox ">
                  <a href="# " className="login_order ">我的订单</a>
                  <a href="# " className="login_favorite ">我的收藏</a>
                </div>
                <i className="icon_arrow_white "></i>
              </div>

            </div>
            <div id="shopCart " className="item ">
              <a href="# ">
                <span className="message "></span>
              </a>
              <p>
                购物车
              </p>
              <p className="cart_num ">{cart.addIds.length}</p>
            </div>
            <div id="asset " className="item ">
              <a href="# ">
                <span className="view "></span>
              </a>
              <div className="mp_tooltip ">
                我的资产
                <i className="icon_arrow_right_black "></i>
              </div>
            </div>

            <div id="foot " className="item ">
              <a href="# ">
                <span className="zuji "></span>
              </a>
              <div className="mp_tooltip ">
                我的足迹
                <i className="icon_arrow_right_black "></i>
              </div>
            </div>

            <div id="brand " className="item ">
              <a href="#">
                <span className="wdsc "><img src="/build/images/wdsc.png " /></span>
              </a>
              <div className="mp_tooltip ">
                我的收藏
                <i className="icon_arrow_right_black "></i>
              </div>
            </div>

            <div id="broadcast " className="item ">
              <a href="# ">
                <span className="chongzhi "><img src="/build/images/chongzhi.png " /></span>
              </a>
              <div className="mp_tooltip ">
                我要充值
                <i className="icon_arrow_right_black "></i>
              </div>
            </div>

            <div className="quick_toggle ">
              <li className="qtitem ">
                <a href="# "><span className="kfzx "></span></a>
                <div className="mp_tooltip ">客服中心<i className="icon_arrow_right_black "></i></div>
              </li>
              {/* <!--二维码 --> */}
              <li className="qtitem ">
                <a href="#none "><span className="mpbtn_qrcode "></span></a>
                <div className="mp_qrcode " style={{display:"none"} }><img src="../images/weixin_code_145.png " /><i className="icon_arrow_white "></i></div>
              </li>
              <li className="qtitem ">
                <a href="#top " className="return_top "><span className="top "></span></a>
              </li>
            </div>

            {/* <!--回到顶部 --> */}
            <div id="quick_links_pop " className="quick_links_pop hide "></div>

          </div>

        </div>
        <div id="prof-content " className="nav-content ">
          <div className="nav-con-close ">
            <i className="am-icon-angle-right am-icon-fw "></i>
          </div>
          <div>
            我
          </div>
        </div>
        <div id="shopCart-content " className="nav-content ">
          <div className="nav-con-close ">
            <i className="am-icon-angle-right am-icon-fw "></i>
          </div>
          <div>
            购物车
          </div>
        </div>
        <div id="asset-content " className="nav-content ">
          <div className="nav-con-close ">
            <i className="am-icon-angle-right am-icon-fw "></i>
          </div>
          <div>
            资产
          </div>

          <div className="ia-head-list ">
            <a href="# " target="_blank " className="pl ">
              <div className="num ">0</div>
              <div className="text ">优惠券</div>
            </a>
            <a href="# " target="_blank " className="pl ">
              <div className="num ">0</div>
              <div className="text ">红包</div>
            </a>
            <a href="# " target="_blank " className="pl money ">
              <div className="num ">￥0</div>
              <div className="text ">余额</div>
            </a>
          </div>

        </div>
        <div id="foot-content " className="nav-content ">
          <div className="nav-con-close ">
            <i className="am-icon-angle-right am-icon-fw "></i>
          </div>
          <div>
            足迹
          </div>
        </div>
        <div id="brand-content " className="nav-content ">
          <div className="nav-con-close ">
            <i className="am-icon-angle-right am-icon-fw "></i>
          </div>
          <div>
            收藏
          </div>
        </div>
        <div id="broadcast-content " className="nav-content ">
          <div className="nav-con-close ">
            <i className="am-icon-angle-right am-icon-fw "></i>
          </div>
          <div>
            充值
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
    (state) => { return {
      cart: state.cart
    }},
    (dispatch) => {return {
    }}
)(NaveSide);
