"use strict";

module.exports = function(sequelize, DataTypes){
  var Category = sequelize.define('Category',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    sentiment: {type: DataTypes.INTEGER, allowNull: true},
    snippet: {type: DataTypes.TEXT, allowNull: true},
    keyword: {type: DataTypes.TEXT, allowNull: true},
    picked: {type: DataTypes.BOOLEAN, allowNull: true},
    editor: {type: DataTypes.STRING(32), allowNull: true},
    edit_time: {type: DataTypes.DATE, allowNull: true},
    review_id: {type: DataTypes.INTEGER, allowNull: false},
    product_id: {type: DataTypes.INTEGER, allowNull: false}
  },{
    tableName: 'category',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  });

  return Category;
};
