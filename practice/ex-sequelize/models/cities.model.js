module.exports = (sequelize, DataTypes) => {
    const City = sequelize.define("city", {
        city_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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
    return City;
};