'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    static associate(models) {
      // define association here
      Note.belongsTo(models.User, { foreignKey: 'userId' })
      Note.belongsTo(models.NoteBook, { foreignKey: 'notebookId' })
    }
  }
  Note.init({
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notebookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Note',
  });
  return Note;
};