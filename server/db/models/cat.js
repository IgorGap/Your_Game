'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Question, { foreignKey: 'cat_id' });
    }
  }
  Cat.init({
    catTitle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cat',
  });
  return Cat;
};
