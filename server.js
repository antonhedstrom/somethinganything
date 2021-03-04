require('dotenv').config();
const express = require('express');
const path = require('path');

const config = require('./config');

const db = require('./api/db');
const apiRoutes = require('./api/api-routes');

const app = express();

(async () => {
  try {
    const database = await db();
    await database.sequelize.authenticate();
    await database.sequelize.sync();
    console.log('✅  Database Connection has been established successfully.');

    app.use((req, res, next) => {
      res.locals.db = database.sequelize.models;
      next();
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return;
  }

  app.use(express.json()); // for parsing application/json
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.use('/api', apiRoutes);
  // Need to send index.html for all other requests so user can reload client routes (i.e. /something)
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });

  app.listen(config.PORT, () => {
    console.log(`🚀  Server is listening on port ${config.PORT}`);
  });
})();
