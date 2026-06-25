module.exports = (sequelize, Sequelize) => {
  const Tag = sequelize.define('tags', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    countCalculator: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  });
  return Tag;
};
