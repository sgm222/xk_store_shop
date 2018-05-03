const RemarkModel = require('./model');
const ResponseUtil = require('../lib/ResponseUtil');
const remarkAPI = (app) => {
    app.get('/api/remark/getRemarkById/:goodsId', (req, res) => {
        let remarkModel = new RemarkModel();
        remarkModel.findRemarkById(req.params.goodsId).then(
        result => { console.log(result); res.send(result); },
        error => { res.send({error}); }
        );
    });
    app.post("/api/remark/submitRemark", (req, res) => {
        let data = req.body;
        let remarkModel = new RemarkModel(
            req.session.user._id,
            req.session.user.userName,
            req.session.user.fileName,
            data.goodsId,
            data.remark,
            data.time
        );
        remarkModel.createRemark().then(
            (model) => {
                return res.send(new ResponseUtil({redirect: "/Owner"}, null));
            }
        ).catch((e) => {
            console.error(e);
        });
    });
};
module.exports = remarkAPI;