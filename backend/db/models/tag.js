'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      // define association here
      Tag.belongsTo(models.User, { foreignKey: 'userId' })
      Tag.hasMany(models.TagTask, { foreignKey: 'tagId' })
    }
  }
  Tag.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Tag',
  });
  return Tag;
};