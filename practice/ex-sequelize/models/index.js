const dbConfig = require('../config/db.config.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

(async () => {
    try {
        await sequelize.authenticate;
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database: ', err);
    }
})();

const db = { sequelize: sequelize };
db.student = require("./students.model.js")(sequelize, DataTypes);
db.city = require("./cities.model.js")(sequelize, DataTypes);

// db.city.hasMany(db.student, { foreignKey: 'city_id' });
db.student.belongsTo(db.city, { foreignKey: 'city_id', as: "city" });

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('DB has been successfully synchronized.')
    } catch (error) {
        console.log(error)
    }
})();

module.exports = db;
