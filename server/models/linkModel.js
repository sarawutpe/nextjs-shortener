const { DataTypes } = require('sequelize');
const sequelize = require('../db_config');

const Link = sequelize.define('links', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  link: {
    type: DataTypes.STRING(255),
  },
  shortLink: {
    type: DataTypes.STRING(255),
  },
  view: {
    type: DataTypes.INTEGER(11),
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

(async () => {
  await Link.sync({ force: false });
})();

module.exports = Link;
