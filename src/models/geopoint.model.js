const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const Geomedia = require('geomedia.model');
const Trail = require('trail.model');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const Geopoint = sequelizeClient.define('Geopoint', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    latitude: {
      type: DataTypes.DOUBLE
    },
    longitude: {
      type: DataTypes.DOUBLE
    },
    _trail_id: {
      type: DataTypes.INTEGER,
      references: 'trails',
      referencesKey: 'id',
      allowNull: false
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  });

  Geopoint.hasMany(Geomedia, {foreignKey: '_geopoint_id', sourceKey: 'id'})
    .belongsTo(Trail, {foreignKey: 'id', sourceKey: '_trail_id'});

  return Geopoint;
};
