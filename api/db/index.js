module.exports = () => new Promise((resolve, reject) => {
  const db = require('./models/index.js');

  resolve(db);
});
