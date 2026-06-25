module.exports = (sequelize, Sequelize) => {
  const CalculatorInCollection = sequelize.define('calculator_in_collections', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    calculatorno: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    calculatorId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    collectionId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  });
  return CalculatorInCollection;
};
