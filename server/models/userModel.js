
const { DataTypes } = require('sequelize');
const sequelize = require('../db_config');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(255),
  },
  password: {
    type: DataTypes.STRING(60),
  },
  email: {
    type: DataTypes.STRING(255),
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

(async () => {
  await User.sync({ force: false });
})();

module.exports = User;
