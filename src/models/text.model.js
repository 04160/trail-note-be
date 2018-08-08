const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const Geomedia = require('geomedia.model');

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const Text = sequelizeClient.define('Text', {
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

  Text.belongsTo(Geomedia, {foreignKey: '_text_id', sourceKey: 'id'});

  return Text;
};
