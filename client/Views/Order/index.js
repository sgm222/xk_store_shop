import {connect} from 'react-redux';
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
import { getAddressById } from '../Address/actions';
import { getGoodsId } from '../Goods/actions';
import * as styles from './styles.css'
let addressTF;
class myOrders extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    addressTF = this.refs.addressTF;
  }
  getLocalTime = (nS) =>{
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');
  } 
  changeStatus = (status) => {
    switch (status) {
      case 0:
        return '待发货'
      case 1:
        return '待收货'
      case 2:
        return '待评价'
      case 3:
        return '以完成' 
      default:
        return '';
    }
  };
  render() {
    const { order, goods, address, cart} = this.props;
    if(order.fetchingOrder) {
      return (
        <div style={{
            width:'1100px',
            margin:'30px auto'
          }}>
        <Link className={styles.link} to='/Owner'>管理订单</Link>
        <MuiThemeProvider>
        <List  style={{
            backgroundColor:'#eee',
            borderRadius:'2px',
            width:'600px',
            margin:'20px auto',
            padding:'10px 30px'
        }}>
            {order.order.map(it => (
                <div style={{marginBottom:'20px',borderBottom:'1px solid #d0cdcd',padding:'10px'}}>
                    <span>{this.getLocalTime(it.time)}</span>
                    <span style={{
                        display:'inline-block',
                        float:'right',
                        marginRight:'20px'
                    }}>
                    {this.changeStatus(it.status)}</span>
                    {it.goodsId.map(item => (
                         <ListItem key={item._id}
                                style={{
                                height:'100px',
                                margin:'10px'
                                }}
                                leftAvatar={<Link to={`/Detail/${item._id}`}><Avatar style={{width:'80px',height:'80px'}} src={"/build/uploadFiles/" + item.fileName} /></Link>}
                                primaryText={
                                <div style={{marginLeft:'80px'}}>{item.name}</div>
                                }
                                secondaryText={
                                <div style={{marginLeft:'80px',marginTop:'20px'}}>
                                    <span style={{display:'inline-block', marginRight:'20px'}}>单价：{item.price}</span>
                                    <span style={{display:'inline-block', marginRight:'20px'}}>数量：{cart.quantityId[item._id]}</span>
                                    <span>总价：{item.price * cart.quantityId[item._id]}</span>
                                </div>
                                }
                            />
                    ))}
                    {address.address.filter(item => it.addressId === item._id).map(it => (
                        <div key={it._id}>
                            <span style={{display:'inline-block', marginRight:'20px'}}>收货人：{it.name}</span>
                            <span style={{display:'inline-block', marginRight:'20px'}}>电话：{it.tel}</span>
                            <span>地址：{it.address}</span>
                        </div>
                    ))}
                </div>
            ))}
            </List>
        </MuiThemeProvider>
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
      cart: state.cart,
      goods: state.goods,
      order: state.order,
      address: state.address,
    }; },
    (dispatch) => { return {
    }; }
  )(myOrders);