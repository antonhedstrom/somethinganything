
const { DataTypes } = require('sequelize');
const crypto = require('crypto');

// https://medium.com/@benjaminpwagner/using-sequelize-hooks-and-crypto-to-encrypt-user-passwords-5cf1a27513d9
module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue('password');
      }
    },
    salt: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue('salt');
      }
    }
  });

  User.generateSalt = () => {
    return crypto.randomBytes(16).toString('base64');
  }
  User.encryptPassword = (plainText, salt) => {
    return crypto
      .createHash('RSA-SHA256')
      .update(plainText)
      .update(salt)
      .digest('hex');
  }

  const setSaltAndPassword = (user) => {
    if (user.changed('password')) {
      user.salt = User.generateSalt();
      user.password = User.encryptPassword(user.password(), user.salt());
    }
  }
  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);

  User.prototype.correctPassword = function(enteredPassword) {
    return User.encryptPassword(enteredPassword, this.salt()) === this.password();
  }

  User.associate = (models) => {
    models.User.hasMany(models.Something);
  };

  return User;
};
