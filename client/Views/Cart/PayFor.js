import {connect} from 'react-redux';
import { getAddress } from './actions';
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import * as styles from './styles.css';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
let goodsIdStr, valueStr, priceStr;
class PayFor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      open: false,
      goodsId:[],
      addressId:'',
      price:0,
    }
  }
  componentDidMount() {
    const {
      getAddress
    } = this.props;
  }
  componentWillMount() {
    const { address } = this.props;
    if(address.fetchingAddress){
      this.setState({
        value: address.address[0]._id
      })
    }
  }
  handleOpen = (carts) => {
    this.setState({open: true});
    console.log(this.state);
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (event, index, value) => this.setState({value});

  onPay() {
    let body = {
        "goodsId": goodsIdStr,
        "addressId": valueStr,
        "price": priceStr,
        "time": new Date().getTime()
    }
    let url = "/api/order/submitOrder";
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
                    window.location.href = result.redirect;
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
    goodsIdStr = this.state.goodsId;
    valueStr = this.state.value;
    priceStr = this.state.price;
    const { goods, cart, address } = this.props;
    const { selected } = this.props.params;
    let carts = []; 
    let selecte = [];
    let sum = 0;
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
        onClick={this.onPay}
      />,
    ];
    if(cart.addIds.length > 0 && goods.goods !== null) {
      if(selected === 'all') {
        cart.addIds.map(id => {
          goods.goods.map((item,idx) => {
            if(id === item._id) {
              carts.push(item);
              sum += item.price * cart.quantityId[item._id];
            }
          })
        })
      } else {
          selected.split(",").map(id => {
            goods.goods.map((item,idx) => {
              if(cart.addIds[id] === item._id) {
                carts.push(item);
                sum += item.price * cart.quantityId[item._id];
              }
            })
          })
      }
    }
    return(
      <div style={{
        width:'1100px',
        margin:'30px auto'
      }}>
        {carts.length > 0 && 
          <MuiThemeProvider>
            <List  style={{backgroundColor:'#eee',borderRadius:'2px',width:'600px',float:'left'}}>
              {carts.map(item => (
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
            </List>
          </MuiThemeProvider>
        }
        {carts.length > 0 && 
          <div style={{
            width:'460px',
            float:'right'
          }}>
          {address.fetchingAddress &&
            <div>
              <p style={{fontSize:'16px'}}>收货地址：</p>
              <MuiThemeProvider>
                <DropDownMenu
                  value={this.state.value}
                  onChange={this.handleChange}
                  style={styles.customWidth}
                  autoWidth={false}
                >
                  {address.address.map((item, idx) => (
                      <MenuItem key={item._id} value={item._id} primaryText={item.name + item.tel + item.address} />
                  ))}
                </DropDownMenu>
              </MuiThemeProvider>
              <p style={{fontSize:'20px'}}></p>
              <Link
                  style={{
                    float: 'left',
                    width: '88px',
                    height: '36px',
                    marginTop: '10px',
                    backgroundColor: '#6FCE53',
                    color:'#fff',
                    lineHeight: '36px',
                    borderRadius: '2px',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    this.setState({open: true});
                    let goodsId = [];
                    carts.map((item) => {
                      goodsId.push(item);
                    })
                    this.setState({
                      goodsId: goodsId,
                      price: sum
                    })
                  }}
              >￥{sum} &nbsp;&nbsp; 结算</Link>
              <MuiThemeProvider>
                  <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    >
                    <span className={styles.span}>请选择支付方式</span>
                    <div style={{margin:'30px auto',width:'600px'}}>
                      <img className={styles.img} src="/build/images/zhifubao.jpg"/>
                      <img className={styles.img} src="/build/images/weizhifu.jpg"/>
                      <img className={styles.img} src="/build/images/wangyin.jpg"/>
                    </div>
                  </Dialog>
              </MuiThemeProvider>
            </div>
          }
          </div>
        }
      </div>
    )
  }
}
export default connect(
    (state) => { return {
      user: state.user,
      cart: state.cart,
      goods: state.goods,
      address: state.address
    }; },
    (dispatch) => { return {
    }; }
  )(PayFor);