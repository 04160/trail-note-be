// Initializes the `trail-db` service on path `/trail-db`
const createService = require('feathers-sequelize');
const createModel = require('../../models/trail-db.model');
const hooks = require('./trail-db.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/trail-db', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('trail-db');

  service.hooks(hooks);
};
