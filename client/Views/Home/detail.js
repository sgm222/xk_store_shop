import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';
import { handleradd } from '../Cart/actions';
import { getGoodsById } from '../Goods/actions';

class UserProfile extends Component {
  componentDidMount() {
    const { getGoodsById } = this.props;
    const { goodsId } = this.props.params;
    getGoodsById(goodsId);
  }

  render() {
    const goods = this.props.goodsDetail;
    if(goods.fetchingGoods) {
        let item = goods.goods[0];
        return (
            <div className={styles.goodsDetail}>
            <div className={styles.detailLeft}>
            {/* <img src={"build/uploadFiles/" + item.img} /> */}
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
            <div className={styles.buyCount}>
                数量：<input type="text" value="1" />
                <button className={styles.addCount}>+</button>
                <button className={styles.reduceCount}>-</button>
            </div>
            <div className={styles.buyBtn}>
                <button className={styles.buyNow}>立即购买</button><button onClick={() => this.props.handleradd(item._id, item.shopId)} className={styles.buyCar}>加入购物车</button>
            </div>
            <div className={styles.serve}>服务承诺&nbsp;坏单包退&nbsp;正品保证&nbsp;极速退款</div>
            </div>
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
  }; },
  (dispatch) => { return {
    getGoodsById: (goodsId) => { dispatch(getGoodsById(goodsId)); },
    handleradd: (goodsId, shopId) => {dispatch(handleradd(goodsId, shopId))},
  }; }
)(UserProfile);