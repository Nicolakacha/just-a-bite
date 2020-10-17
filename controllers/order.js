/* eslint-disable consistent-return */
const db = require('../models');
const { Op } = require('sequelize');
const { Menu } = db;

const orderController = {
  getCart: (req, res) => {
    const clientResult = req.body;
    let resultArr = [];
    for (let i = 0; i < clientResult.length; i++) {
      let item = {};
      await Menu.findOne({
        where: {
          id: clientResult[i].id,
        },
      }).then((result) => {
        item.id = result.id;
        item.title = result.title;
        item.price = result.price;
        item.quantity = clientResult[i].quantity;
        resultArr.push(item);
        if (i == clientResult.length - 1) {
          res.status(200).json(resultArr);
        }
      });
    }
  },

  manageOrder: (req, res) => {
    res.render('manage_order');
  },
};

module.exports = orderController;
