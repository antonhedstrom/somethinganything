
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Something = sequelize.define('something', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
  });

  return Something;
};
