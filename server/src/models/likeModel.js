module.exports = (sequelize, Sequelize) => {
  const Like = sequelize.define('likes', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    calculatorId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  });
  return Like;
};
