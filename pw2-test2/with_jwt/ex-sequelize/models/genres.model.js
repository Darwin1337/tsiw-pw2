module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define("genre", {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
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
    return Genre;
};