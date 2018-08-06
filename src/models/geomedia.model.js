const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const geomedia = sequelizeClient.define('geomedia', {
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
    _geopoint_id: {
      type: DataTypes.INTEGER,
      references: 'Geopoint',
      referencesKey: 'id',
      allowNull: false
    },
    _pic_id: {
      type: DataTypes.INTEGER,
      references: 'Pic',
      referencesKey: 'id',
      allowNull: false
    },
    _text_id: {
      type: DataTypes.INTEGER,
      references: 'Text',
      referencesKey: 'id',
      allowNull: false
    },
    _video_id: {
      type: DataTypes.INTEGER,
      references: 'Video',
      referencesKey: 'id',
      allowNull: false
    },
    _audio_id: {
      type: DataTypes.INTEGER,
      references: 'Audio',
      referencesKey: 'id',
      allowNull: false
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  });

  // // eslint-disable-next-line no-unused-vars
  // geomedia.associate = function (models) {
  //   // Define associations here
  //   // See http://docs.sequelizejs.com/en/latest/docs/associations/
  // };

  return geomedia;
};
