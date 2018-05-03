import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';
import { handleradd } from '../Cart/actions';
import { getGoodsById } from '../Goods/actions';
import { getRemark } from '../Remark/actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router';
class UserProfile extends Component {
  componentDidMount() {
    const { getGoodsById, handleradd, getRemark } = this.props;
    const { goodsId } = this.props.params;
    getGoodsById(goodsId);
    getRemark(goodsId);
  }
  getLocalTime = (nS) =>{
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');
  } 
  render() {
    const goods = this.props.goodsDetail;
    const { remark } = this.props;
    if(goods.fetchingGoods) {
        let item = goods.goods[0];
        return (
            <div style={{width:'1100px',margin:'50px auto'}}>
            <div className={styles.goodsDetail}>
                <div className={styles.detailLeft}>
                <img src={"../build/uploadFiles/" + item.img} />
                </div>
                <div className={styles.detailRight}>
                <div className={styles.goodsDis}>
                    <span>{item.name}</span>
                </div>
                <div className={styles.goodsPrice}>促销价：¥ {item.price}</div>
                    <div className={styles.goodsWeight}>净重：{item.weight}</div>
                    <div className={styles.saleAndCount}><span className={styles.goodsSale}>月销售量:{item.salecount}</span><span  className="goodsCount">&nbsp;&nbsp;&nbsp;&nbsp;库存:{item.count}</span>
                </div>
                <div className={styles.buyBtn}>
                    <Link onClick={() => this.props.handleradd(item._id, item.shopId)} to='/Cart' className={styles.buyNow}>立即购买</Link>
                    <button onClick={() => this.props.handleradd(item._id, item.shopId)} className={styles.buyCar}>加入购物车</button>
                </div>
                <div className={styles.serve}>服务承诺&nbsp;坏单包退&nbsp;正品保证&nbsp;极速退款</div>
                </div>
            </div>
            <MuiThemeProvider>
                <List>
                    {remark.fetchingRemark && remark.remark.map(item => (
                        <ListItem
                        leftAvatar={<Avatar src={"/build/uploadFiles/" + item.userImg} />}
                        primaryText={item.userName}
                        secondaryText={
                            <div>
                                <p>{this.getLocalTime(item.time)}</p>
                                <p>{item.remark}</p>
                            </div>
                        }
                        secondaryTextLines={2}
                        />
                    ))}
                </List>
            </MuiThemeProvider>
            </div>
        );
    } else {
        return(
            <span>{goods.error}</span>
        )
    }
  }
}

export default connect(
  (state) => { return {
    goodsDetail: state.goodsDetail,
    remark: state.remark
  }; },
  (dispatch) => { return {
    getGoodsById: (goodsId) => { dispatch(getGoodsById(goodsId)); },
    getRemark: (goodsId) => { dispatch(getRemark(goodsId)); },
    handleradd: (goodsId, shopId) => {dispatch(handleradd(goodsId, shopId))},
  }; }
)(UserProfile);