import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { getCartGoods } from '../Goods/actions'
import { clearCart } from './actions'
class Cart extends React.Component {
    componentDidMount() {
        const {
        getCartGoods,
        clearCart,
        } = this.props;
    }
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true
    })
  }
  handleOk = () => {
    const {cart,dispatch} = this.props
    const order = cart.addIds.reduce((obj,num)=>{
      obj[num] = cart.quantityId[num]
      return obj
    },{})
    dispatch(TodoActions.addhistory(order,new Date().getTime()))
    dispatch(TodoActions.clearproduct())
    this.setState({
      visible: false
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  clearproduct = () => {
    const {dispatch} = this.props
    dispatch(TodoActions.clearproduct())
  }
  render() {
    const { cart } = this.props
    const carts = cart.addIds.map(id => getCartGoods(id))
    return (
        <table>
            <thead>
                <th>商品名称</th>
                <th>单价</th>
                <th>数量</th>
                <th>金额</th>
            </thead>
            <tbody>
                {carts.map((item, idx) => {
                    <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>￥{item.price}</td>
                        <td>{cart.quantityId[item._id]}</td>
                        <td>{cart.quantityId[item._id] * item.price}</td>
                    </tr>
                })}
            </tbody>
        </table>  
        <div className="total">
          <div onClick={this.props.clearCart} className="fl total-clear">
            清空
          </div>
          <div className="fr total-all" onClick={this.showModal}>
            去结算
          </div>
          <div className="fr total-font">
            <span className="total-symbol">&nbsp;￥</span>
            {cart.addIds.reduce((sum, productId) => {
              return sum + count.byId[productId]['price']*cart.quantityId[productId];
            },0)}
          </div>
        </div>
        <Modal title="提示框" visible={this.state.visible}
               onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <h5>确认购买？</h5>
          <p>（购买后请到购买记录查看）</p>
        </Modal>
    )
  }
}

export default connect(
    (state) => { return {
      cart: state.cart
    }; },
    (dispatch) => { return {
        getCartGoods: (id) => { dispatch(getCartGoods(id)); },
        clearCart: () => { dispatch(clearCart()); },
    }; }
  )(cart);