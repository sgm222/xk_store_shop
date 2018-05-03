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
import TextField from "material-ui/TextField";
import { deleteById, modifyById } from '../Order/actions';
let remarkTF;
class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      sureid: '',
      remarkid: '',
      goodsId: '',
      open: false,
      sureopen: false,
      remarkopen: false
    };
  }
  componentDidMount() {
    const {
      getAddress,
      deleteById,
      modifyById
    } = this.props;
    remarkTF = this.refs.remarkTF;
  }
  handleOpen = (_id) => {
    this.setState({open: true, _id: _id});
  };
  sureOpen = (_id) => {
    this.setState({sureopen: true, sureid: _id});
  };
  remarkOpen = (_id, goodsId) => {
    this.setState({remarkopen: true, remarkid: _id, goodsId: goodsId});
  };
  remarkClose = () => {
    this.setState({remarkopen: false});
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
  onRemark(goodsId, remarkStr) { 
    let infoFinished = true;
    if (remarkStr === "") {
        this.setState({
            nameError: "不能为空"
        });
        infoFinished = false;
    }
    if (!infoFinished) {
        return;
    }
    let body = {
        "goodsId": goodsId,
        "remark": remarkStr,
        "time": new Date().getTime()
    }
    let url = "/api/remark/submitRemark";
    fetch(url, {
        method: "post",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'     
    }).then(
        (response) => {
            return response.json();
        }
    ).then(
        (json) => {
            if (json.result) {
                let result=json.result;
                if (result.redirect) {
                    //window.location.href = result.redirect;
                }
                else {
                    // this.setState({failureOpen: true})
                }
            }
        }
    ).catch(
       console.error('error')
    )
  }
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
          this.props.modifyById(this.state.sureid, 2)
        }}
      />,
    ];
    const remarkactions = [
      <FlatButton
        label="取消"
        primary={true}
        onClick={this.remarkClose}
      />,
      <FlatButton
        label="确定"
        primary={true}
        keyboardFocused={true}
        onClick={()=> {
          this.remarkClose();
          this.onRemark(this.state.goodsId, this.state.remark)
          this.props.modifyById(this.state.remarkid, 3)
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
                                    marginRight:'20px',
                                    marginTop:'-15px'
                                }}>
                                  {this.changeStatus(it.status)}
                                  <RaisedButton onClick={(e) => {this.remarkOpen(it._id, it.goodsId[0]._id)}} label="评价" style={{margin: '12px'}} />
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
            <MuiThemeProvider>
                <Dialog
                  actions={remarkactions}
                  modal={false}
                  open={this.state.remarkopen}
                  >
                  <div>评价：</div>
                  <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                              errorText={this.state.remarkError}
                              value={this.state.remark || ""}
                              onChange={
                                  (event, str) => {
                                      this.setState({remark: str});
                                      if (this.state.remarkError !== "") {
                                          this.setState({
                                            remarkError: ""
                                          })
                                      }
                              }}
                              id="remarkTF"
                              ref="remarkTF"/> 
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
      modifyById: (orderId, status) => {dispatch(modifyById(orderId, status))}
    }; }
  )(Owner);