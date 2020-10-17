/* eslint-disable consistent-return */
const db = require('../models');
const { Menu } = db;

const orderController = {
  getCart: (req, res) => {
    let resultArr = [];
    const clientResult = req.body;
    clientResult.forEach((product, index) => {
      let item = {};
      Menu.findOne({
        where: {
          id: product.name,
        },
      }).then((result) => {
        item.id = result.id;
        item.title = result.title;
        item.price = result.price;
        item.quantity = product.number;
        console.log(item.id);
        resultArr.push(item);
        if (index == clientResult.length - 1) {
          res.status(200).json(resultArr);
          console.log(clientResult);
          console.log(resultArr);
        }
      }).catch(err => console.log(err));
    });
  },

  manageOrder: (req, res) => {
    res.render('manage_order');
  },
};

module.exports = orderController;
