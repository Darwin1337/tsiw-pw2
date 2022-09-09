module.exports = (sequelize, DataTypes) => {
    const Instance = sequelize.define("instance", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: DataTypes.ENUM('Available', 'Booked', 'Maintenance'),
            defaultValue: null,
            validate: {
                isIn: {
                    args: [['Available', 'Booked', 'Maintenance']],
                    msg: "Allowed values: available, booked or maintenance."
                }
            }
        },
        booked_by: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        returnDate: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        bookId: {
            type: DataTypes.INTEGER,
            defaultValue: null,
            references: {
               model: 'books',
               key: 'id'
            }
        }
    }, {
        timestamps: false
    });
    return Instance;
};