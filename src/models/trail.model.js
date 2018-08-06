const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const User = require('user.model');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const trail = sequelizeClient.define('trail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
    },
    _users_id: {
      type: DataTypes.INTEGER,
      references: 'User',
      referencesKey: 'id',
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  });
  // // // eslint-disable-next-line no-unused-vars
  // trail.associate = function (models) {
  //   // Define associations here
  //   // See http://docs.sequelizejs.com/en/latest/docs/associations/
  //
  // };
  // // trail.belongsTo(User);

  return trail;
};
