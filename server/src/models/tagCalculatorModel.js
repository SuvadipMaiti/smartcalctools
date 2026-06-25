module.exports = (sequelize, Sequelize) => {
  const TagCalculator = sequelize.define('tag_calculators', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    tagId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    calculatorId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  });
  return TagCalculator;
};
