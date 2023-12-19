'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
     
      Product.belongsTo(models.Section,{
        as : 'section',
        foreignKey : 'sectionId'
      });
      Product.belongsTo(models.Category,{
        as : 'category',
        foreignKey : 'categoryId'
      });
      Product.belongsTo(models.Region,{
        as : 'region',
        foreignKey : 'regionId'
      });
      Product.hasMany(models.Image,{
        as : 'images',
        foreignKey : 'productId',
        onDelete : 'cascade'
      });
    }
  }
  Product.init({
    title: DataTypes.STRING,
    price: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    amountmin: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    categoryId: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER,
    regionId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
    //paranoid : true,
  });
  return Product;
};