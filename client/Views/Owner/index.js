import {connect} from 'react-redux';
import React, {Component} from 'react';
import { Link } from 'react-router';
import * as styles from './styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { deleteById, modifyById } from '../Order/actions';
class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      sureid: '',
      open: false,
      sureopen: false
    };
  }
  componentDidMount() {
    const {
      getAddress,
      deleteById,
      modifyById
    } = this.props;
  }
  handleOpen = (_id) => {
    this.setState({open: true, _id: _id});
  };
  sureOpen = (_id) => {
    this.setState({sureopen: true, sureid: _id});
  };
  sureClose = () => {
    this.setState({sureopen: false});
  };
  handleClose = () => {
    this.setState({open: false});
  };
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
      default:
        return '';
    }
  };
  render() {
    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="确定"
        primary={true}
        keyboardFocused={true}
        onClick={()=> {
          this.handleClose();
          this.props.deleteById(this.state._id)
        }}
      />,
    ];
    const sureactions = [
      <FlatButton
        label="取消"
        primary={true}
        onClick={this.sureClose}
      />,
      <FlatButton
        label="确定"
        primary={true}
        keyboardFocused={true}
        onClick={()=> {
          this.sureClose();
          this.props.modifyById(this.state.sureid)
        }}
      />,
    ];
    const { order, goods, address, cart, user} = this.props;
    if(order.fetchingOrder) {
      return(
        <div style={{
          width:'800px',
          margin:'30px auto'
        }}>
          {user.fetchingUser && 
            <div style={{marginBottom:'30px'}}> 
              <MuiThemeProvider>
                <Avatar style={{width:'80px',height:'80px'}} src={"/build/uploadFiles/" + user.fileName} />
              </MuiThemeProvider>
              <span>{user.name}</span>
              <Link to='/myAddress'>我的收货地址</Link>
              <Link to='/myOrders'>我的订单</Link>
            </div>
          }
            <MuiThemeProvider>
            <Tabs>
              <Tab label="待发货" style={{backgroundColor: '#6fce53'}}>
                <div>
                  <MuiThemeProvider>
                    <List  style={{
                        backgroundColor:'#eee',
                        borderRadius:'2px',
                        margin:'50px auto',
                        padding:'10px 30px'
                    }}>
                        {order.order.filter(item => item.status === 0).map(it => (
                            <div style={{marginBottom:'20px',borderBottom:'1px solid #d0cdcd',padding:'10px'}}>
                                <span>{this.getLocalTime(it.time)}</span>
                                <span style={{
                                    display:'inline-block',
                                    float:'right',
                                    marginRight:'20px',
                                    marginTop:'-15px'
                                }}>
                                  {this.changeStatus(it.status)}&nbsp;&nbsp;&nbsp;
                                  <RaisedButton onClick={(e) => {this.handleOpen(it._id)}} label="删除" style={{margin: '12px'}} />
                                </span>
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
              </Tab>
              <Tab label="待收货" style={{backgroundColor: '#6fce53'}}>
                <div>
                <MuiThemeProvider>
                    <List  style={{
                        backgroundColor:'#eee',
                        borderRadius:'2px',
                        margin:'50px auto',
                        padding:'10px 30px'
                    }}>
                        {order.order.filter(item => item.status === 1).map(it => (
                            <div style={{marginBottom:'20px',borderBottom:'1px solid #d0cdcd',padding:'10px'}}>
                                <span>{this.getLocalTime(it.time)}</span>
                                <span style={{
                                    display:'inline-block',
                                    float:'right',
                                    marginRight:'20px',
                                    marginTop:'-15px'
                                }}>
                                  {this.changeStatus(it.status)}
                                  <RaisedButton onClick={(e) => {this.sureOpen(it._id)}} label="确认收货" style={{margin: '12px'}} />
                                </span>
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
              </Tab>
              <Tab  label="待评价" style={{backgroundColor: '#6fce53'}}>
                <div>
                <MuiThemeProvider>
                    <List  style={{
                        backgroundColor:'#eee',
                        borderRadius:'2px',
                        margin:'50px auto',
                        padding:'10px 30px'
                    }}>
                        {order.order.filter(item => item.status === 2).map(it => (
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
              </Tab>
            </Tabs>
            </MuiThemeProvider>
            <MuiThemeProvider>
                <Dialog
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  >
                  确定删除订单吗？
                </Dialog>
            </MuiThemeProvider>
            <MuiThemeProvider>
                <Dialog
                  actions={sureactions}
                  modal={false}
                  open={this.state.sureopen}
                  >
                  确定收货请检查包裹完好
                </Dialog>
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
      deleteById: (orderId) => {dispatch(deleteById(orderId))},
      modifyById: (orderId) => {dispatch(modifyById(orderId))}
    }; }
  )(Owner);