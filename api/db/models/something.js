
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Something = sequelize.define('Something', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
  });

  Something.associate = (models) => {
    models.Something.hasMany(models.Anything);
    models.Something.belongsToMany(models.Tag, { through: 'SomethingsTags' });
  };

  return Something;
};
