const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require(path.join(process.cwd(), 'config/config'));

let sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    pool: config.db.pool,
    logging: true,
    timezone: "+09:00"
});

let db = {};

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf(".") !== 0) && (file !== "index.js")
}).forEach(file => {
    let model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;