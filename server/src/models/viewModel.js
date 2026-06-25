module.exports = (sequelize, Sequelize) => {
  const View = sequelize.define('views', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    ip: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    calculatorId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  });
  return View;
};
