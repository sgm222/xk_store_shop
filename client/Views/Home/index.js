import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import Button from 'Components/Button';
import logo from 'SharedStyles/logg.jpg';
import appLayout from 'SharedStyles/appLayout.css';
import * as styles from './styles.css';

import $ from './jquery.min.js';
import scripts from './lunbo.js';
import { handleradd } from '../Cart/actions';

class Home extends Component {
  componentDidMount() {
    const {
      handleradd,
    } = this.props;
  }
  
  render() {
    const {goods} = this.props.goods;
    if(this.props.goods.fetchingGoods){
    return (
      <div className={classnames(appLayout.constraintWidth, styles.contentArea)}>
        <Helmet><title>小康电子商城</title></Helmet>
        {/* <span>csdscdcsd</span> */}
          <div>
    <div className="hmtop">
        <div className="nav white">
          <div className="logo"><img src="../images/logo.png" /></div>
          <div className="logoBig">
            <li><img src={logo} /></li>
          </div>

          <div className="search-bar pr">
            <a name="index_none_header_sysc" href="#"></a>
            <form>
              <input id="searchInput" name="index_none_header_sysc" type="text" placeholder="搜索"  />
              <input id="ai-topsearch" className="submit am-btn" value="搜索"  type="submit" />
            </form>
          </div>
        </div>

        <div className="clear"></div>
      </div>
      <div className="banner">
            <div id="ads" className={styles.ads}>
              <img style={{zIndex:"-1"}} src="/build/images/01.jpg" alt=""  name="img" className="show" />
              <img src="/build/images/02.jpg" alt=""  name="img" />
              <img src="/build/images/03.jpg" alt=""  name="img" />
              <img src="/build/images/04.jpg" alt=""  name="img" />
              <img src="/build/images/02.jpg" alt=""  name="img" />
              <img src="/build/images/01.jpg" alt=""  name="img" />
              <ul>
                <li  name="li" className="active"></li>
                <li  name="li"></li>
                <li  name="li"></li>
                <li  name="li"></li>
                <li  name="li"></li>
                <li  name="li"></li>
              </ul>
            </div>
            <div className="clear"></div> 
      </div>
      <div className="shopNav">
        <div className="slideall">

             <div className="long-title"><span className="all-goods">全部分类</span></div>
             <div className="nav-cont">
              <ul>
                <li className="index"><a href="#">首页</a></li>
                                <li className="qc"><a href="#">闪购</a></li>
                                <li className="qc"><a href="#">限时抢</a></li>
                                <li className="qc"><a href="#">团购</a></li>
              </ul>
                
            </div>
                    
            <div id="nav" className="navfull">
              <div className="area clearfix">
                <div className="category-content" id="guide_2">
                  <div className="category">
                    <ul className="category-list" id="js_climit_li">
                      <li className="appliance js_toggle relative first">
                        <div className="category-info">
                          <h3 className="category-name b-category-name">
                            <i><img src="/build/images/cake.png" />
                            </i>
                            <a className="ml-22" title="水果">水果
                            </a>
                          </h3>
                          <em>&gt;</em>
                        </div>
                       
                      <b className="arrow"></b> 
                      </li>
                      <li className="appliance js_toggle relative">
                        <div className="category-info">
                          <h3 className="category-name b-category-name"><i><img src="/build/images/cookies.png" /></i><a className="ml-22" title="饼干、膨化">蔬菜</a></h3>
                          <em>&gt;</em></div>
                       
                          <b className="arrow"></b>
                      </li>
                      <li className="appliance js_toggle relative">
                        <div className="category-info">
                          <h3 className="category-name b-category-name"><i><img src="/build/images/meat.png" /></i><a className="ml-22" title="熟食、肉类">粮油</a></h3>
                          <em>&gt;</em></div>
                          <b className="arrow"></b>
                      </li>
                      <li className="appliance js_toggle relative">
                        <div className="category-info">
                          <h3 className="category-name b-category-name"><i><img src="/build/images/bamboo.png" /></i><a className="ml-22" title="素食、卤味">肉制品</a></h3>
                          <em>&gt;</em></div>
                          <b className="arrow"></b>
                      </li>
                      <li className="appliance js_toggle relative">
                        <div className="category-info">
                          <h3 className="category-name b-category-name"><i><img src="/build/images/nut.png" /></i><a className="ml-22" title="坚果、炒货">天然干货</a></h3>
                          <em>&gt;</em></div>
                        <b className="arrow"></b>
                      </li>
                      <li className="appliance js_toggle relative">
                        <div className="category-info">
                          <h3 className="category-name b-category-name"><i><img src="/build/images/candy.png" /></i><a className="ml-22" title="糖果、蜜饯">茶</a></h3>
                          <em>&gt;</em></div>
                          <b className="arrow"></b>
                      </li>
                     
                    </ul>
                  </div>
                </div>
              </div>
            </div>        
          <div className="clear"></div>
        </div>
      </div>
      <div className="shopMainbg">
        <div className="shopMain" id="shopmain">           
                    <div id="f9">
                    <div className="am-container ">
                      <div className="shopTitle ">
                        <h4>水果</h4>
                      </div>
                    </div>
                    
                    <div className="am-g am-g-fixed floodFive ">
                                  
                      <div className="am-u-sm-5 am-u-md-3 text-one list">
                        <div className="word">
                          <a className="outer" href="#"><span className="inner"><b className="text">核桃</b></span></a>
                          <a className="outer" href="#"><span className="inner"><b className="text">核桃</b></span></a>
                          <a className="outer" href="#"><span className="inner"><b className="text">核桃</b></span></a> 
                          <a className="outer" href="#"><span className="inner"><b className="text">核桃</b></span></a>
                          <a className="outer" href="#"><span className="inner"><b className="text">核桃</b></span></a>
                          <a className="outer" href="#"><span className="inner"><b className="text">核桃</b></span></a>                 
                        </div>              
                        <div className="triangle-topright"></div> 
                      </div>
                      {goods.map((item, idx) => (
                        <div className="am-u-sm-7 am-u-md-5 am-u-lg-2 text-two" key={idx}>
                          <div className="outer-con ">
                            <div className="title ">
                              {item.name}
                            </div>
                            <div className="sub-title ">
                              {item.price}
                            </div>
                            <img style={{
                              width: '30px',
                              height: '30px',
                              marginRight: '-80px',
                              transition: 'all 0.2s'
                              }}
                              onClick={() => this.props.handleradd(item._id, item.shopId)}
                              src="build/images/shopping.png"/>                 
                          </div>
                          <Link to={`/Detail/${item._id}`}><img src={"build/uploadFiles/" + item.fileName} /></Link>           
                        </div>
                      ))}
                    
                    </div>

                    <div className="clear "></div>
                    </div>      

                  </div>
                </div>
              </div>
              </div>
            
              );
            } else {
              return null;
            }
            }
          }

export default connect(
    (state) => { return {
      user: state.user,
      goods: state.goods,
      cart: state.cart
    }},
    (dispatch) => {return {
      handleradd: (goodsId, shopId) => {dispatch(handleradd(goodsId, shopId))},
    }}
)(Home);



