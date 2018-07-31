'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'geomedias',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        _geopoint_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'geopoints',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        _pic_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'pics',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        _text_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'texts',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        _video_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'videos',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        },
        _audio_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'audios',
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
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('geomedias');
  }
};
