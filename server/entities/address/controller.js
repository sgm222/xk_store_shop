
const Address = require('./model');

const getAddress = () => {
    return new Promise((resolve, reject) => {
        Address.find({}, (error, results) => {
            if (error) { reject(error); }
            else if (!results) { reject(null); }
            else { resolve(results);}
        });
    });
};
const getAddressById = (userId) => {;
    return new Promise((resolve, reject) => {
        Address.find({userId: userId}, (error, results) => {
            if (error) { reject(error); }
            else if (!results) { reject(null); }
            else { resolve(results);}
        });
    });
  };
module.exports = {
  getAddress,
  getAddressById
};