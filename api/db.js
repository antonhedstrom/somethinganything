
const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes, Model } = require('sequelize');

const user = require('./models/user');
const something = require('./models/something');
const anything = require('./models/anything');
const tag = require('./models/tag');

const basename = path.basename(__filename);

module.exports = () => new Promise((resolve, reject) => {
  const db = {};

  const sequelize = new Sequelize(process.env.DB_CONNECTIONSTRING, {
    dialect: 'postgres',
  });

  // Init models
  user(sequelize);
  something(sequelize);
  anything(sequelize);
  tag(sequelize);

  // Create associations
  const models = sequelize.models;
  models.user.hasMany(models.something);
  models.something.hasMany(models.anything);
  models.anything.belongsTo(models.something);

  // N:M
  models.something.belongsToMany(models.tag, { through: 'SomethingsTags' });
  models.tag.belongsToMany(models.something, { through: 'SomethingsTags' });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

  resolve(db);
});
