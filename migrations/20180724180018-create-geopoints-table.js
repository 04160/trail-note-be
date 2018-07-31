'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'geopoints',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        latitude: {
          type: Sequelize.DOUBLE,
          allowNull: false
        },
        longitude: {
          type: Sequelize.DOUBLE,
          allowNull: false
        },
        _trail_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'trails',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: Sequelize.DATE
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('geopoints');
  }
};
