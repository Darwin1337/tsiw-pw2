module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Name cannot be empty or null!"
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true,
            validate: {
                notNull: {
                    msg: "Password cannot be empty or null!"
                }
            }
        },
        role: {
            type: DataTypes.ENUM('regular', 'admin'),
            defaultValue: 'regular',
            allowNull: false,
            validate: {
                isIn: {
                    args: [['regular', 'admin']],
                    msg: "Allowed values: regular or admin."
                },
                notNull: {
                    msg: "Role cannot be empty or null!"
                }
            }
        }
    }, {
        timestamps: false
    });
    return User;
};