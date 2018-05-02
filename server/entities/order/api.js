const OrderModel = require('./model');
const ResponseUtil = require('../lib/ResponseUtil');
const orderAPI = (app) => {
    app.get('/api/order/getOrder', (req, res) => {
        let orderModel = new OrderModel();
        if(req.session.user) {
            orderModel.findOrderByUserId(req.session.user._id).then(
            result => { res.send(result); },
            error => { res.send({error}); }
            );
        }else {
            res.send(null);
        }
    });
    app.post("/api/order/submitOrder", (req, res) => {
        let data = req.body;
        let orderModel = new OrderModel(
            req.session.user._id,
            data.time,
            data.goodsId,
            data.addressId,
            data.price,
            0
        );
        orderModel.createOrder().then(
            (model) => {
                return res.send(new ResponseUtil({redirect: "/myOrders"}, null));
            }
        ).catch((e) => {
            console.error(e);
        });
    });
    app.post("/api/order/delOrderById", (req, res) => {
        let orderModel = new OrderModel();
        orderModel.deleteOrderById(req.body.orderId)
        .then(
            (model) => {
                if(model.result.ok === 1){
                    return res.send(new ResponseUtil({success: true}, null));
                } else {
                    return res.send(new ResponseUtil(null, {errorMsg: "删除失败"}));
                }
            }
        ).catch((e) => {
            console.error('error');
        });
    });
    app.post("/api/order/modifyOrderById", (req, res) => {
        let orderModel = new OrderModel();
          let data = {
           status: 2
          }
          orderModel.findOrderAndUpdate(req.body.orderId, data)
          .then(
              (model) => {
                if (model !== null) {
                  return res.send(new ResponseUtil({redirect: "/Owner"}, null));
                } else {
                  return res.send(new ResponseUtil(null, {errorMsg: "没有数据~", errorType: 1}));
                }
              }
          ).catch((e) => {
            return res.send(new ResponseUtil(null, {errorMsg: "出错啦，请重试", errorType: 2}));
          })
    });
};
module.exports = orderAPI;