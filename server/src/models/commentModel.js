module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define('comments', {
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
    comment: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Comment;
};
