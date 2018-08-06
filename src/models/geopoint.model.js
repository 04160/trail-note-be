const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const geopoint = sequelizeClient.define('geopoint', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    name: {
      type: DataTypes.CHAR,
    },
    message: {
      type: DataTypes.TEXT,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  });

  // // eslint-disable-next-line no-unused-vars
  // geopoint.associate = function (models) {
  //   // Define associations here
  //   // See http://docs.sequelizejs.com/en/latest/docs/associations/
  // };

  return geopoint;
};
