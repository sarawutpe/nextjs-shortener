const { DataTypes } = require('sequelize');
const sequelize = require('../db_config');

const Url = sequelize.define('urls', {
  id: {
    type: DataTypes.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
  },
  url: {
    type: DataTypes.STRING(255),
  },
  shortUrl: {
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
  await Url.sync({ force: false });
})();

module.exports = Url;
