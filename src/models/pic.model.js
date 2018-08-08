const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const Geomedia = require('geomedia.model');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const Pic = sequelizeClient.define('Pic', {
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

  Pic.belongsTo(Geomedia, {foreignKey: '_pic_id', sourceKey: 'id'});

  return Pic;
};
