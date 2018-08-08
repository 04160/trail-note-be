const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const Audio = require('audio.model');
const Video = require('video.model');
const Text = require('text.model');
const Pic = require('pic.model');
const Geopoint = require('geopoint.model');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const Geomedia = sequelizeClient.define('Geomedia', {
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
      references: 'geopoints',
      referencesKey: 'id',
      allowNull: false
    },
    _pic_id: {
      type: DataTypes.INTEGER,
      references: 'pics',
      referencesKey: 'id',
      allowNull: true
    },
    _text_id: {
      type: DataTypes.INTEGER,
      references: 'texts',
      referencesKey: 'id',
      allowNull: true
    },
    _video_id: {
      type: DataTypes.INTEGER,
      references: 'videos',
      referencesKey: 'id',
      allowNull: true
    },
    _audio_id: {
      type: DataTypes.INTEGER,
      references: 'audios',
      referencesKey: 'id',
      allowNull: true
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  });

  Geomedia.hasOne(Audio, {foreignKey: 'id', sourceKey: '_audio_id'})
    .hasOne(Video, {foreignKey: 'id', sourceKey: '_video_id'})
    .hasOne(Text, {foreignKey: 'id', sourceKey: '_text_id'})
    .hasOne(Pic, {foreignKey: 'id', sourceKey: '_pic_id'})
    .belongsTo(Geopoint, {foreignKey: 'id', sourceKey: '_geopoint_id'});

  return Geomedia;
};
