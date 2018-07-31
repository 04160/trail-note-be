const trailDb = require('./trail-db/trail-db.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(trailDb);
};
