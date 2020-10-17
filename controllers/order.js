/* eslint-disable consistent-return */
const db = require('../models');
const { Menu } = db;

const orderController = {
  getCart: (req, res) => {
    let resultArr = [];
    const clientResult = req.body;
    clientResult.forEach( async(product, index) => {
      let item = {};
      let result = await Menu.findOne({
        where: {
          id: product.name,
        },
      });
      setTimeout(() => {
        item.id = result.id;
        item.title = result.title;
        item.price = result.price;
        item.quantity = product.number;
        resultArr.push(item);
        if (index == clientResult.length - 1) {
          return res.status(200).json(resultArr);
        }
      }, 1000);
    });
  },

  manageOrder: (req, res) => {
    res.render('manage_order');
  },
};

module.exports = orderController;
