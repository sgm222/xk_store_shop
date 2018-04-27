let config = require('config-lite');
let mongoose = require('mongoose');

let mongoConnected = false;
class MongoUtil {
    constructor() {

    }

    connect() {
        console.log("mongoose start connect");
        mongoose.connect(config.mongodb);

        let db = mongoose.connection;
        db.on('error', () => {
            console.error.bind(console, 'connection error:');
            this.connect();
        });
        db.once('open', function (callback) {
            // yay!
            console.log("open db success");
            mongoConnected = true;
        });
    }

    checkConnected() {
        return mongoConnected;
    }

    createModel(modelName, schema, modelValue) {
        let modelSchema = mongoose.Schema(schema);

        let Model;
        try {
            Model = mongoose.model(modelName);                //判断Model是不是已存在
        } catch (error) {
            Model = mongoose.model(modelName, modelSchema);
        }

        let model = new Model(modelValue);
        return model.save();   //promise 返回model
    }

    findModel(modelName, schema) {
        let modelSchema = mongoose.Schema(schema);

        let Model;
        try {
            Model = mongoose.model(modelName);                //判断Model是不是已存在
        } catch (error) {
            Model = mongoose.model(modelName, modelSchema);
        }
        return Model.find({});
        // return model.save();   //promise 返回model
    }
    findModelAndUpdateByKeyMap(modelName, schema, _id, data) {
        let modelSchema = mongoose.Schema(schema);
        let Model;
        try {
            Model = mongoose.model(modelName);                //判断Model是不是已存在
        } catch (error) {
            Model = mongoose.model(modelName, modelSchema);
        }
        return Model.findOneAndUpdate({_id: _id}, {$set:data});
    }
    findModelSort(modelName, schema, sort) {
        let modelSchema = mongoose.Schema(schema);

        let Model;
        try {
            Model = mongoose.model(modelName);                //判断Model是不是已存在
        } catch (error) {
            Model = mongoose.model(modelName, modelSchema);
        }
        return Model.find({}).sort(sort);
        // return model.save();   //promise 返回model
    }

    findModelByKeyMap(modelName, schema, keymap) {
        let modelSchema = mongoose.Schema(schema);

        let Model;
        try {
            Model = mongoose.model(modelName);                //判断Model是不是已存在
        } catch (error) {
            Model = mongoose.model(modelName, modelSchema);
        }
        return Model.find(keymap);
        // return model.save();   //promise 返回model
    }
    deleteModelByKeyMap(modelName, schema, keymap) {
        let modelSchema = mongoose.Schema(schema);

        let Model;
        try {
            Model = mongoose.model(modelName);                //判断Model是不是已存在
        } catch (error) {
            Model = mongoose.model(modelName, modelSchema);
        }
        return Model.remove(keymap);
        // return model.save();   //promise 返回model
    }
    deleteAll(modelName, schema) {
        let modelSchema = mongoose.Schema(schema);

        let Model;
        try {
            Model = mongoose.model(modelName);                //判断Model是不是已存在
        } catch (error) {
            Model = mongoose.model(modelName, modelSchema);
        }
        return Model.remove({});
        // return model.save();   //promise 返回model
    }
}

module.exports = MongoUtil;