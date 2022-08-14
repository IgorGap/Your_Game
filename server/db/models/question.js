'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Cat, { foreignKey: 'cat_id' });
    }
  }
  Question.init({
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    points: DataTypes.INTEGER,
    cat_id: DataTypes.INTEGER,
		comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};
