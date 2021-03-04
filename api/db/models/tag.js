
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    color: DataTypes.STRING,
  });

  Tag.associate = (models) => {
    models.Tag.belongsToMany(models.Something, { through: 'SomethingsTags' });
  };

  return Tag;
};
