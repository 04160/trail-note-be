const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const Trail = require('trail.model');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const User = sequelizeClient.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  });

  User.hasMany(Trail, {foreignKey: '_users_id', sourceKey: 'id'});

  return User;
};
