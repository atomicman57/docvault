require('dotenv').config();

module.exports = {
  development: {
    username: process.env.USERNAME,
    password: null,
    database: process.env.DBDEV,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.USERNAME,
    password: null,
    database: process.env.DBTEST,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
