let MongoUtil = require("../lib/MongoUtil");
let cartSechma = {
    userId: String,
    shopId: String,
    goodsId: String,
    count: Number
  };
let modelName = "cart";
class CartModel {
    constructor(userId, shopId, goodsId, count) {
        this.userId = userId;
        this.shopId = shopId;
        this.goodsId = goodsId;
        this.count = count;
    }
    createCart() {
        let cartValue = {
            userId: this.userId,
            shopId: this.shopId,
            goodsId: this.goodsId,
            count: this.count
        };
        let mongoUtil = new MongoUtil();
        return mongoUtil.createModel(modelName, cartSechma, cartValue );
    }
    updataCart(_id, data) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelAndUpdateByKeyMap(modelName, cartSechma, _id, data);
    }
    findUserByName(userName) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, cartSechma, {userName, userName});
    }

    findCartById(userId, goodsId) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, cartSechma, {userId: userId, goodsId: goodsId});
    }
    findCart() {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModel(modelName, cartSechma);
    }
    deleteCartById(userId, goodsId) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.deleteModelByKeyMap(modelName, cartSechma, {userId: userId, goodsId: goodsId});
    }
    deleteAll(userId) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.deleteModelByKeyMap(modelName, cartSechma, {userId: userId});
    }
}

module.exports = CartModel;