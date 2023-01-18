module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          message: 'Please enter your username'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          message: 'Email Cannot be null!'
        }
      }
    },
    // phone: {
    //   type: DataTypes.BIGINT(15),
    //   allowNull: false,
    //   unique: true
    // },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Users;
};
