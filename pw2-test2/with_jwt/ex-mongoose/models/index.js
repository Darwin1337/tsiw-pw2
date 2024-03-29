const dbConfig = require('../config/db.config.js');
const mongoose = require("mongoose");
const db = {};

db.mongoose = mongoose;
db.url = dbConfig.URL;
db.secret = dbConfig.SECRET;

(async () => {
    try {
        await db.mongoose.connect(db.url,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            );
        console.log("Connected to the database!");
    } catch (error) {
        console.log("Cannot connect to the database!", err);
        process.exit();
    }
})();

db.users = require("./users.model.js")(mongoose);
db.instances = require("./instances.model.js")(mongoose);
db.books = require("./books.model.js")(mongoose);
module.exports = db;