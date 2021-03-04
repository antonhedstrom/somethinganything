require('dotenv').config();
const fs = require('fs');

module.exports = {
  // App
  PORT: process.env.PORT || 8080,

  // Database
  development: {
    use_env_variable: 'DB_CONNECTIONSTRING',
    dialect: 'postgres',
  },
  test: {
    use_env_variable: 'DB_CONNECTIONSTRING',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DB_CONNECTIONSTRING',
    dialect: 'postgres',
  }
};
