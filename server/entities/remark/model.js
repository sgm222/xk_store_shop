let MongoUtil = require("../lib/MongoUtil");
let remarkSechma = {
  userId: String,
  userName: String,
  userImg: String,
  goodsId: String,
  remark: String,
  time: String
};
let modelName = "remark";
class RemarkModel {
    constructor(userId, userName, userImg,  goodsId, remark, time) {
      this.userId = userId;
      this.userName = userName;
      this.userImg = userImg;
      this.goodsId = goodsId;
      this.remark = remark;
      this.time = time;
    }

    createRemark() {
        let remarkValue = {
          userId: this.userId,
          userName: this.userName,
          userImg: this.userImg,
          goodsId: this.goodsId,
          remark:this.remark,
          time:this.time
        };
        let mongoUtil = new MongoUtil();
        return mongoUtil.createModel(modelName, remarkSechma, remarkValue);
    }
    findRemarkById(goodsId) {
        let mongoUtil = new MongoUtil();
        return mongoUtil.findModelByKeyMap(modelName, remarkSechma, {goodsId: goodsId});
    }
}

module.exports = RemarkModel;
