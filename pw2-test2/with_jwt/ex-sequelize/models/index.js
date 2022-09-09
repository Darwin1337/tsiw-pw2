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
db.book = require("./books.model.js")(sequelize, DataTypes);
db.genre = require("./genres.model.js")(sequelize, DataTypes);
db.instance = require("./instances.model.js")(sequelize, DataTypes);

db.book.belongsToMany(db.genre, { through: 'booksGenres', foreignKey: 'bookId', timestamps: false }); 
db.genre.belongsToMany(db.book, { through: 'booksGenres', foreignKey: 'genreName', timestamps: false });

db.book.hasMany(db.instance, { foreignKey: 'id' });
db.instance.belongsTo(db.book, { foreignKey: 'bookId' });

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('DB has been successfully synchronized.')
    } catch (error) {
        console.log(error)
    }
})();

module.exports = db;
