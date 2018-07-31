'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query('ALTER TABLE public.geomedias ADD CONSTRAINT geo_media_non_null CHECK((_pic_id IS NOT NULL) OR (_text_id IS NOT NULL) OR (_video_id IS NOT NULL) OR (_audio_id IS NOT NULL));');
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.sequelize.query('ALTER TABLE public.geomedias DROP CONSTRAINT IF EXISTS geo_media_non_null');
  }
};
