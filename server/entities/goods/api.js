const GoodsModel = require('./model');
const {getGoods, getGoodsById} = require('./controller');
const ResponseUtil = require('../lib/ResponseUtil');
const goodsAPI = (app) => {
  app.get('/api/goods/getGoods', (req, res) => {
    getGoods().then(
      result => { res.send(result); },
      error => { res.send({error}); }
    );
  });
  app.get('/api/goods/getGoodsById/:goodsId', (req, res) => {
    getGoodsById(req.params.goodsId).then(
      result => { res.send(result); },
      error => { res.send({error}); }
    );
  });
};

module.exports = goodsAPI;