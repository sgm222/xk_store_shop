const AddressModel = require('./model');
const { getAddress, getAddressById } = require('./controller');
const ResponseUtil = require('../lib/ResponseUtil');
const addressAPI = (app) => {
  app.get('/api/address/getUserAddress', (req, res) => {
    let addressModel = new AddressModel();
    if(req.session.user) {
      addressModel.findAddressByUserId(req.session.user._id).then(
        result => { console.log(result); res.send(result); },
        error => { res.send({error}); }
        );
    } else {
        res.send(null);
    }
  });
  app.get('/api/address/getAddressById/:addressId', (req, res) => {
    let addressModel = new AddressModel();
    addressModel.findAddressById(req.params.addressId).then(
      result => { res.send(result); },
      error => { res.send({error}); }
    );
  });
  app.post("/api/address/Addaddress", (req, res) => {
      let data = req.body;
      let addressModel = new AddressModel(
        req.session.user._id,
        data.name,
        data.tel,
        data.address
      );
      addressModel.createAddress().then(
          (model) => {
              return res.send(new ResponseUtil({redirect: "/myAddress"}, null));
          }
      ).catch((e) => {
          console.error(e);
      });
  });
  app.post("/api/address/Modifyaddress/:addressId", (req, res) => {
    let addressModel = new AddressModel();
      let data = {
        name: req.body.name,
        tel: req.body.tel,
        address: req.body.address
      }
      addressModel.findGoodsAndUpdate(req.params.addressId, data)
      .then(
          (model) => {
            if (model !== null) {
              return res.send(new ResponseUtil({redirect: "/myAddress"}, null));
            } else {
              return res.send(new ResponseUtil(null, {errorMsg: "没有数据~", errorType: 1}));
            }
          }
      ).catch((e) => {
        return res.send(new ResponseUtil(null, {errorMsg: "出错啦，请重试", errorType: 2}));
      })
  });
};

module.exports = addressAPI;