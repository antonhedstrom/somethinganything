
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Anything = sequelize.define('anything', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.STRING, // Defining how to render this type of anything. Is it a Location? Markdown? Date? URL?
    value1: DataTypes.STRING, // This is generic, can be longitude for a position, markdown for a text type and so on...
    value2: DataTypes.STRING,
  });

  return Anything;
};
