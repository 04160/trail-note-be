require('dotenv').config();
const app = require('../../src/app');
const env = process.env.NODE_ENV || 'development';
const dialect = process.env.DB_DIALECT;

module.exports = {
  [env]: {
    'dialect': 'postgres',
    url: app.get(dialect),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_PORT,
    port: process.env.DB_HOSTNAME,
    migrationStorageTableName: '_migrations'
  }
};
