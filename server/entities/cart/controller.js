
const Cart = require('./model');

const getCart = () => {
    return new Promise((resolve, reject) => {
        Cart.find({}, (error, results) => {
            if (error) { reject(error); }
            else if (!results) { reject(null); }
            else { resolve(results);}
        });
    });
};
const getCartByUserId = (userId) => {;
    return new Promise((resolve, reject) => {
        Cart.find({userId: userId}, (error, results) => {
            if (error) { reject(error); }
            else if (!results) { reject(null); }
            else { resolve(results);}
        });
    });
};
module.exports = {
    getCart,
    getCartByUserId,
    getCartById
};