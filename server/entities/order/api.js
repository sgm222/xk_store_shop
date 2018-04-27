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
};
module.exports = orderAPI;