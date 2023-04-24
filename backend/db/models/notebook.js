'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notebook extends Model {
    static associate(models) {
      // define association here
      Notebook.belongsTo(models.User, { foreignKey: 'userId' })
      Notebook.hasMany(models.Note, {foreignKey: "notebookId"})
    }
  }
  Notebook.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Notebook',
  });
  return Notebook;
};