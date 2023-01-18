module.exports = (sequelize, DataTypes) => {
    const Employees = sequelize.define("Employees", {
    //   id: {
    //     type: DataTypes.UUID,
    //     defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    //     primaryKey: true
    //   },
      empName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.BIGINT(15),
        allowNull: false,
        unique: true
      },
      salary: {
        type: DataTypes.BIGINT(10),
        allowNull: false,
        unique: true
      },
    });
    return Employees;
  };
  