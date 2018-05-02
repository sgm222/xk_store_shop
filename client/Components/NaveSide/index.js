import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import * as styles from './styles';
import appLayout from 'SharedStyles/appLayout.css';
import { Link } from 'react-router';
class NaveSide extends Component {
  render() {
    const {cart} = this.props;
    return (
        <div className="tip">
        <div id="sidebar">
          <div id="wrap">
            <div id="prof" className="item ">
              <Link to="/Owner">
                <span className="setting "></span>
              </Link>
            </div>
            <Link to="/Cart">
              <div id="shopCart " className="item ">
                  <span className="message "></span>
                <p style={{marginTop:'40px'}}>购物车</p>
                <p className="cart_num ">{cart.addIds.length}</p>
              </div>
            </Link>
            
            <Link to="/myOrders">
              <div id="brand " className="item ">
                  <span className="wdsc "><img src="/build/images/wdsc.png " /></span>
                  <p>订单</p>
              </div>
            </Link>
            
            <div className="quick_toggle ">
              <li className="qtitem ">
                <Link to="/"><span className="mpbtn_qrcode "></span></Link>
                <div className="mp_qrcode " style={{display:"none"} }><img src="../images/weixin_code_145.png " /><i className="icon_arrow_white "></i></div>
              </li>

              <li className="qtitem ">
                <a href="#top " className="return_top "><span className="top "></span></a>
              </li>
            </div>
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
