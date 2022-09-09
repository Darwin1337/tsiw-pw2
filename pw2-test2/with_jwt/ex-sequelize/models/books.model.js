module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("book", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Name cannot be empty or null!"
                }
            }
        }
    }, {
        timestamps: false
    });
    return Book;
};