const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const User = require('user.model');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const Trail = sequelizeClient.define('Trail', {
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
      references: 'users',
      referencesKey: 'id',
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  });

  Trail.belongsTo(User, { foreignKey: 'id', sourceKey: '_users_id'});

  return Trail;
};
