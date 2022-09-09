module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("student", {
        number: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Number cannot be empty or null!"
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Name cannot be empty or null!"
                }
            }
        },
        gender: {
            type: DataTypes.ENUM('M', 'F'),
            validate: {
                isIn: {
                    args: [['M', 'F']],
                    msg: "Allowed values: M or F."
                }
            }
        },
        course: {
            type: DataTypes.ENUM('TSIW','TCAV','MULTIMEDIA','FOTOGRAFIA','DESIGN'),
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Course cannot be empty or null!"
                },
                isIn: {
                    args: [['TSIW','TCAV','MULTIMEDIA','FOTOGRAFIA','DESIGN']],
                    msg: "Allowed values: TSIW, TCAV, MULTIMEDIA, FOTOGRAFIA or DESIGN."
                }
            }
        },
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
               model: 'cities',
               key: 'city_id'
            },
            validate: {
                notNull: {
                    msg: "City ID cannot be empty or null!"
                }
            }
        }
    }, {
        timestamps: false
    });
    return Student;
};