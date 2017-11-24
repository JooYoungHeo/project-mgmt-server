"use strict";

module.exports = function(sequelize, DataTypes){
  var Project = sequelize.define('Project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    manager: {type: DataTypes.STRING(255), allowNull: false},
    start_date: {type: DataTypes.DATE, allowNull: false},
    due_date: {type: DataTypes.DATE, allowNull: false},
    project_type: {type: DataTypes.ENUM('S','T'), allowNull: false},
    active: {type: DataTypes.BOOLEAN, allowNull: false}
  },{
    tableName: 'project',
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  });

  return Project;
};
