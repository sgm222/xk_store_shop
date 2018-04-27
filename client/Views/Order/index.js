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
let addressTF;
class myOrders extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const {
        getOrder
    } = this.props;
    addressTF = this.refs.addressTF;
  }
  turnAddress(id) {
    const {  address } = this.props;
    console.log(this.props);
    if(addressTF){
        console.log(addressTF);
        address.address.map(item => {
            if(id === item._id) {
                addressTF.innerText = item.name; 
            }
        })
    }
  }
  render() {
    const { order, goods, address, cart} = this.props;
    console.log(this.props);
    let ordergoods = []; 
    let selecte = [];
    let sum = 0;
    if(order.fetchingOrder) {
      return (
        <MuiThemeProvider>
        <List  style={{backgroundColor:'#eee',borderRadius:'2px',width:'600px',float:'left'}}>
            {order.order.map(it => (
                <div>
                    <span>{it.time}</span>
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
                    <span>fghfhghf{address.address.filter(item => it.addressId === item._id)[0].name}</span>
                </div>
            ))}
            </List>
        </MuiThemeProvider>
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
        getOrder: () => { dispatch(getOrder()); },
    }; }
  )(myOrders);