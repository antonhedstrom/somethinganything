
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Tag = sequelize.define('tag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    color: DataTypes.STRING,
  });

  return Tag;
};
