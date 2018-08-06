const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const text = sequelizeClient.define('text', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    filename: {
      type: DataTypes.STRING,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  });

  // // eslint-disable-next-line no-unused-vars
  // text.associate = function (models) {
  //   // Define associations here
  //   // See http://docs.sequelizejs.com/en/latest/docs/associations/
  // };

  return text;
};
