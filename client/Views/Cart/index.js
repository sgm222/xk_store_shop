import {connect} from 'react-redux';
import { clearCart } from './actions';
import { Link } from 'react-router';
import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import * as styles from './styles.css';
import { handleradd, handlerdel, deleteById } from './actions';
import Dialog from 'material-ui/Dialog';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      _id: '',
      open: false,
      clearopen: false 
    };
  }
  componentDidMount() {
    const {
      handleradd,
      handlerdel,
      deleteById,
      clearCart
    } = this.props;
  }
 
  isSelected = (index) => {
    return this.state.selected && this.state.selected.indexOf(index) !== -1;
  };

  handleOpen = (_id) => {
    this.setState({open: true, _id: _id});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  handleClearOpen = () => {
    this.setState({clearopen: true});
  }
  handleClearClose = () => {
    this.setState({clearopen: false});
  };
  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };
  sum(carts) {
    const { cart } = this.props;
    let sum  = 0;
    if(this.state.selected === 'all') {
      carts.map((item, idx) => {
        sum += item.price * cart.quantityId[item._id];
      })
    } else if(this.state.selected === 'none') {
      sum = 0;
    } else {
      this.state.selected.map((idx) => {
        sum += carts[idx].price * cart.quantityId[carts[idx]._id];
      })
    }
    return sum;
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
    const clearactions = [
      <FlatButton
        label="取消"
        primary={true}
        onClick={this.handleClearClose}
      />,
      <FlatButton
        label="确定"
        primary={true}
        keyboardFocused={true}
        onClick={()=> {
          this.handleClearClose();
          this.props.clearCart();
        }}
      />,
    ];
    const { goods, cart } = this.props;
    let carts = []; 
    if(cart.addIds && goods.goods) {
      cart.addIds.map(id => {
        goods.goods.map((item,idx) => {
            if(id === item._id) {
              carts.push(item);
            }
        })
      });
    }
    if(carts.length > 0) {
      return (
        <div style={{
          width:'1100px',
          margin:'30px auto'
        }}>
          <MuiThemeProvider>
            <Table 
              onRowSelection={this.handleRowSelection}
              multiSelectable={true}
            >
             <TableHeader >
              <TableRow>
                  <TableHeaderColumn>全选</TableHeaderColumn>
                  <TableHeaderColumn>图片</TableHeaderColumn>
                  <TableHeaderColumn>单价</TableHeaderColumn>
                  <TableHeaderColumn>数量</TableHeaderColumn>
                  <TableHeaderColumn>总价</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody deselectOnClickaway={false}>
                {carts.map((item,idx) => (
                  <TableRow selected={this.isSelected(idx)} key={item._id}>
                    <TableRowColumn>{item.name}</TableRowColumn>
                    <TableRowColumn><img src={"build/uploadFiles/" + item.fileName} style={{width:'30px',height:'30px'}}/></TableRowColumn>
                    <TableRowColumn>￥{item.price}</TableRowColumn>
                    <TableRowColumn>
                        <a  onClick = {
                          (e) => {
                            e.stopPropagation();
                            this.props.handleradd(item._id, item.shopId);
                           }} 
                          className={styles.toggleadd}
                        >+</a>
                        <div style={{margin:'5px',display:'inline-block'}}>{cart.quantityId[item._id]}</div>
                        {cart.quantityId[item._id] > 1 && 
                          <a onClick = {
                              (e) => {
                                e.stopPropagation();
                                this.props.handlerdel(item._id, item.shopId)
                            }} 
                            className={styles.toggleadd} 
                          >-</a>
                        }
                        {cart.quantityId[item._id] <= 1 && 
                          <a onClick = {
                            (e) => {
                              e.stopPropagation();
                          }}  
                          className={styles.toggleadd}>&nbsp;</a>
                        }
                  </TableRowColumn>
                    <TableRowColumn>￥{cart.quantityId[item._id] * item.price}</TableRowColumn>
                    <TableRowColumn><RaisedButton onClick={(e) => {e.stopPropagation(); this.handleOpen(item._id)}} label="删除" style={{margin: '12px'}} /></TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </MuiThemeProvider>
            <div style={{
              width: '1100px',
              height: '60px',
              backgroundColor: '#f7f7f7',
              padding:'12px',
              marginTop: '20px'
            }}>
              <MuiThemeProvider>
                <RaisedButton
                   label = '清空购物车'
                   style={{
                     float: 'left',
                     marginLeft: '10px'
                   }}
                   onClick={this.handleClearOpen}
                />
                </MuiThemeProvider>
                <span style={{
                  display: 'inline-block',
                  float:'left',
                  marginLeft: '760px',
                  marginTop: '8px',
                  fontSize: '20px'
                }}>￥{this.sum(carts)}</span>
                <MuiThemeProvider>
                {(this.state.selected.length === 0 || this.state.selected === 'none') && 
                  <Link
                    style={{
                      float: 'right',
                      width: '88px',
                      height: '36px',
                      marginRight: '40px',
                      backgroundColor: '#e5e5e5',
                      lineHeight: '36px',
                      borderRadius: '2px',
                      textAlign: 'center'
                    }}
                  >结算</Link>
                }
                </MuiThemeProvider>
                <MuiThemeProvider>
                {(this.state.selected.length > 0 || this.state.selected === 'all') && 
                  <Link
                    to={`/PayFor/${this.state.selected}`}
                    style={{
                      width: '88px',
                      height: '36px',
                      float: 'right',
                      marginRight: '40px',
                      backgroundColor: '#6FCE53',
                      lineHeight: '36px',
                      borderRadius: '2px',
                      textAlign: 'center'
                    }}
                  >结算</Link>
                }
              </MuiThemeProvider>
              <MuiThemeProvider>
                <Dialog
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  >
                  确定删除吗？
                </Dialog>
              </MuiThemeProvider>
              <MuiThemeProvider>
                <Dialog
                  actions={clearactions}
                  modal={false}
                  open={this.state.clearopen}
                  >
                  确定清空购物车吗？
                </Dialog>
              </MuiThemeProvider>
            </div>
        </div>
      );
    } else {
      return (
        <div style={{
          width:'1100px',
        }}>
        <MuiThemeProvider>
          <CircularProgress style={{
            marginTop: '100px',
            marginLeft: '510px'
          }} size={80} thickness={5} />
        </MuiThemeProvider>
        </div>
      )
    }
  }
}
export default connect(
    (state) => { return {
      cart: state.cart,
      goods: state.goods
    }; },
    (dispatch) => { return {
        clearCart: () => { dispatch(clearCart()); },
        handleradd: (goodsId, shopId) => {dispatch(handleradd(goodsId, shopId))},
        handlerdel: (goodsId, shopId) => {dispatch(handlerdel(goodsId, shopId))},
        deleteById: (goodsId) => {dispatch(deleteById(goodsId))}
    }; }
  )(Cart);