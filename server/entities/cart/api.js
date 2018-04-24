const CartModel = require('./model');
const ResponseUtil = require('../lib/ResponseUtil');
const cartAPI = (app) => {
    app.get('/api/cart/getCart', (req, res) => {
        let cartModel = new CartModel();
        cartModel.findCart(req.session.user._id).then(
        result => { res.send(result); },
        error => { res.send({error}); }
        );
    });
    app.post("/api/cart/saveCart", (req, res) => {
        let cart = req.body;
        let cartModel = new CartModel();
        cartModel.findCartById(req.session.user._id, cart.goodsId)
        .then(
            (models) => {
                if (models !== null && models.length > 0) {
                    let model = models[0];
                    let data = {count: model.count + 1};
                    cartModel.updataCart(model._id, data).then(
                        (model) => { 
                            return res.send(new ResponseUtil({success: true}, null));
                        }
                    ).catch((e) => {
                        console.error(e);
                    });
                } else {
                    console.log('create');
                    let cartCreateModel = new CartModel(req.session.user._id, cart.shopId, cart.goodsId, 1);
                    cartCreateModel.createCart().then(
                        (model) => {
                            return res.send(new ResponseUtil({success: true}, null));
                        }
                    ).catch((e) => {
                        console.error(e);
                    });
                }
            }
        ).catch((e) => {
            console.error('error');
        });
    });
};

module.exports = cartAPI;