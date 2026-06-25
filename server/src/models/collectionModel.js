module.exports = (sequelize, Sequelize) => {
  const Collection = sequelize.define('collections', {
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
  });
  return Collection;
};
