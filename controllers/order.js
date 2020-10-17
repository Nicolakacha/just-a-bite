/* eslint-disable consistent-return */
const db = require('../models');
const { Op } = require('sequelize');
const { Menu } = db;

const orderController = {
  getCart: async (req, res) => {
    const clientResult = req.body;
    let resultArr = [];
    for await (let product of clientResult) {
      let item = {};
      const result = await Menu.findOne({
        where: {
          id: product.id,
        },
      })
      item.id = result.id;
      item.title = result.title;
      item.price = result.price;
      item.quantity = product.quantity;
      resultArr.push(item);
    }
    res.status(200).json(resultArr);
  },

  manageOrder: (req, res) => {
    res.render('manage_order');
  },
};

module.exports = orderController;
