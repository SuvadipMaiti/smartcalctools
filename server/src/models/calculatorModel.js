module.exports = (sequelize, Sequelize) => {
  const Calculator = sequelize.define('calculators', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    slug: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    file: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    fileUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    url: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    publishTime: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    likes: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
    views: {
      allowNull: true,
      type: Sequelize.INTEGER,
    },
  });
  return Calculator;
};
