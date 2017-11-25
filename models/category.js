"use strict";

module.exports = function(sequelize, DataTypes){
    var Category = sequelize.define('Category',{
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        category_name: {type: DataTypes.STRING(255), allowNull: false},
        worker: {type: DataTypes.STRING(255), allowNull: false},
        wbs: {type: DataTypes.JSON, allowNull: false},
        start_date: {type: DataTypes.DATE, allowNull: false},
        due_date: {type: DataTypes.DATE, allowNull: false},
        active: {type: DataTypes.BOOLEAN, allowNull: false},
        parent: {type: DataTypes.STRING(255), allowNull: false},
        project_id: {type: DataTypes.INTEGER, allowNull: false}
    },{
        tableName: 'category',
        freezeTableName: true,
        timestamps: false,
        underscored: true,
    });

    return Category;
};
