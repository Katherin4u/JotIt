'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Task.init({
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};