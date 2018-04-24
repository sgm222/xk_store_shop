
const Goods = require('./model');

const getGoods = () => {
    console.log('getgoods');
    return new Promise((resolve, reject) => {
        Goods.find({}, (error, results) => {
            if (error) { console.log('error'); reject(error); }
            else if (!results) { console.log('!result'); reject(null); }
            else {console.log('result'); resolve(results);}
        });
    });
};
const getGoodsById = (goodsId) => {;
    return new Promise((resolve, reject) => {
        Goods.find({_id: goodsId}, (error, results) => {
            if (error) { console.log('error'); reject(error); }
            else if (!results) { console.log('!result'); reject(null); }
            else {console.log('result'); resolve(results);}
        });
    });
  };
module.exports = {
  getGoods,
  getGoodsById
};