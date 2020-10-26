'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prize extends Model {
    static associate(models) {
    }
  };
  Prize.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    url: DataTypes.TEXT,
    weight: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prize',
  });
  return Prize;
};