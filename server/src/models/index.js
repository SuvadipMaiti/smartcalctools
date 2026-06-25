const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./userModel.js')(sequelize, Sequelize);
db.Calculator = require('./calculatorModel.js')(sequelize, Sequelize);
db.Comment = require('./commentModel.js')(sequelize, Sequelize);
db.View = require('./viewModel.js')(sequelize, Sequelize);
db.Like = require('./likeModel.js')(sequelize, Sequelize);
db.Collection = require('./collectionModel.js')(sequelize, Sequelize);
db.Tag = require('./tagModel.js')(sequelize, Sequelize);
db.TagCalculator = require('./tagCalculatorModel.js')(sequelize, Sequelize);
db.CalculatorInCollection = require('./calculatorInCollectionsModel.js')(sequelize, Sequelize);




db.User.hasMany(db.Calculator, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'hasManyCalculators',
});

db.Calculator.belongsTo(db.User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'belongsToUser',
});

db.Tag.belongsToMany(db.Calculator, {
  through: 'tag_calculators',
  foreignKey: 'tagId',
  targetKey: 'id',
  as: 'belongsToCalculator',
});
db.Calculator.belongsToMany(db.Tag, {
  through: 'tag_calculators',
  foreignKey: 'calculatorId',
  targetKey: 'id',
  as: 'belongsToTag',
});

db.User.hasMany(db.Comment, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'hasManyComments',
});

db.Comment.belongsTo(db.User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'belongsToUser',
});


db.Calculator.hasMany(db.Comment, {
  foreignKey: 'calculatorId',
  targetKey: 'id',
  as: 'hasManyComments',
});

db.Comment.belongsTo(db.Calculator, {
  foreignKey: 'calculatorId',
  targetKey: 'id',
  as: 'belongsToCalculator',
});

db.Calculator.hasMany(db.View, {
  foreignKey: 'calculatorId',
  targetKey: 'id',
  as: 'hasManyViews',
});

db.View.belongsTo(db.Calculator, {
  foreignKey: 'calculatorId',
  targetKey: 'id',
  as: 'belongsToCalculator',
});

db.Calculator.hasMany(db.Like, {
  foreignKey: 'calculatorId',
  targetKey: 'id',
  as: 'hasManyLikes',
});

db.Like.belongsTo(db.Calculator, {
  foreignKey: 'calculatorId',
  targetKey: 'id',
  as: 'belongsToCalculator',
});

db.User.hasMany(db.Like, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'hasManyLikes',
});

db.Like.belongsTo(db.User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'belongsToUser',
});

db.User.hasMany(db.Collection, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'hasManyCollections',
});

db.Collection.belongsTo(db.User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'belongsToUser',
});

db.Collection.hasMany(db.CalculatorInCollection, {
  foreignKey: 'collectionId',
  targetKey: 'id',
  as: 'hasManyCalculatorInCollections',
});

db.CalculatorInCollection.belongsTo(db.Calculator, {
  foreignKey: 'calculatorId',
  targetKey: 'id',
  as: 'belongsToCalculator',
});

db.CalculatorInCollection.belongsTo(db.User, {
  foreignKey: 'userId',
  targetKey: 'id',
  as: 'belongsToUser',
});

db.CalculatorInCollection.belongsTo(db.Collection, {
  foreignKey: 'collectionId',
  targetKey: 'id',
  as: 'belongsToCollection',
});

// https://www.bezkoder.com/sequelize-associate-many-to-many/#:~:text=belongsToMany()%20provides%20simple%20way,two%20columns%3A%20tag_id%20and%20tutorial_id.

module.exports = db;
