'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TagTask extends Model {
    static associate(models) {
      // define association here
      TagTask.belongsTo(models.Task, { foreignKey: 'taskId' })
      TagTask.belongsTo(models.Tag, { foreignKey: 'tagId' })
    }
  }
  TagTask.init({
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'TagTask',
  });
  return TagTask;
};