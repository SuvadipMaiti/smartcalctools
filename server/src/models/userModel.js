module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    googleId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    wishlist: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    otp: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    activationToken: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    admin: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    active: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  });
  return User;
};
