let MongoUtil = require("../lib/MongoUtil");
let addressSechma = {
  userId: String,
  name: String,
  tel: String,
  address: String
};
let modelName = "address";
class AddressModel {
    constructor(userId, name, tel, address) {
      this.userId = userId;
      this.name = name;
      this.tel = tel;
      this.address = address;
    }

    createAddress() {
        let addressValue = {
          userId: this.userId,
          name: this.name,
          tel: this.tel,
          address:this.address ,
        };
        let mongoUtil = new MongoUtil();
        return mongoUtil.createModel(modelName, addressSechma, addressValue);
    }
    findAddress() {
      let mongoUtil = new MongoUtil();
      return mongoUtil.findModelByKeyMap(modelName, addressSechma);
    }
    findAddressByUserId(userId) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, addressSechma, {userId, userId});
    }
    findAddressById(_id) {
      let mongoUtil = new MongoUtil();
      return mongoUtil.findModelByKeyMap(modelName, addressSechma, {_id, _id});
    }
    findGoodsAndUpdate(id, data) {
      let mongoUtil = new MongoUtil();
      return mongoUtil.findModelAndUpdateByKeyMap(modelName, addressSechma, id, data);
    }
    deleteAddressById(_id) {
      let mongoUtil = new MongoUtil();
      return mongoUtil.deleteModelByKeyMap(modelName, addressSechma, {_id: _id});
  }
}

module.exports = AddressModel;
