const asyncHandler = require('express-async-handler');
const Models = require('../models');
const Calculator = Models.Calculator;
const User = Models.User;
const TagCalculator = Models.TagCalculator;
const Tag = Models.Tag;
const Validator = require('fastest-validator');
const { Op } = require('sequelize');
var Sequelize = require('sequelize');
const fs = require('fs');
const moment = require('moment');

// @desc all Calculators
// @route GET /api/calculator/list
// @access Private
// @Author Suvadip Maiti
const allCalculators = asyncHandler(async (req, res) => {
  const authid = parseInt(req.query.authid);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const search = req.query.search || ''; // Get search query from query parameters
  var wishlist = null;

  var calculators = [];
  var whereCondition = {};
  const todayUtc = moment().utc().format();

  if (search && search !== 'undefined') {
    // Split the search into individual words
    const searchWords = search.split(/\s+/);
    whereCondition = {
      [Op.or]: searchWords.map((word) => ({
        [Op.or]: [
          { title: { [Op.like]: `%${word}%` } },
          { '$belongsToTag.name$': { [Op.like]: `%${word}%` } },
          { '$belongsToUser.name$': { [Op.like]: `%${word}%` } },
        ],
      })),
    };
  }

  if (authid && authid !== 'undefined') {
    const findUser = await User.findOne({
      where: { id: authid },
    });
    if (findUser && findUser?.id) {
      wishlist = findUser?.wishlist;
    }
    if (wishlist && wishlist !== '') {
      // Convert comma-separated string to an array
      const wishlistArray = wishlist.split(',');
      // Construct the search condition
      whereCondition[Op.and] = {
        [Op.or]: wishlistArray.map((item) => ({
          [Op.or]: [
            { title: { [Op.like]: `%${item}%` } },
            { '$belongsToTag.name$': { [Op.like]: `%${item}%` } },
            { '$belongsToUser.name$': { [Op.like]: `%${item}%` } },
          ],
        })),
      };
    }
  }

  const offset = (page - 1) * limit;
  if ((wishlist && wishlist !== '') || (search && search !== 'undefined')) {
    calculators = await Calculator.findAll({
      where: {
        [Op.and]: [
          whereCondition,
          { publishTime: { [Op.lte]: todayUtc } }, // Publish date less than or equal today
        ],
      },
      order: [['publishTime', 'DESC']],
      include: [
        {
          model: Models.User,
          as: 'belongsToUser',
        },
        {
          model: Models.Tag,
          as: 'belongsToTag',
        },
      ],
    });

    calculators = calculators.slice(offset).slice(0, limit);
  } else {
    calculators = await Calculator.findAll({
      where: {
        [Op.and]: [
          whereCondition,
          { publishTime: { [Op.lte]: todayUtc } }, // Publish date less than or equal today
        ],
      },
      order: [['publishTime', 'DESC']],
      include: [
        {
          model: Models.User,
          as: 'belongsToUser',
        },
        {
          model: Models.Tag,
          as: 'belongsToTag',
        },
      ],
      offset,
      limit,
    });
  }

  // console.log(calculators);
  res.status(200).json({
    message: 'all calculators',
    status: true,
    data: calculators,
  });
});

// @desc all Calculators
// @route GET /api/calculator/list-by-tag
// @access Private
// @Author Suvadip Maiti
const allCalculatorsByTag = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const tagId = req.query.tagId || ''; // Get search query from query parameters
  try {
    var calculators = [];
    var whereCondition = {};
    const todayUtc = moment().utc().format();

    if (tagId) {
      whereCondition = {
        [Op.or]: [{ '$belongsToTag.id$': { [Op.eq]: tagId } }],
      };
    }

    const offset = (page - 1) * limit;
    calculators = await Calculator.findAll({
      where: {
        [Op.and]: [
          whereCondition,
          { publishTime: { [Op.lte]: todayUtc } }, // Publish date less than or equal today
        ],
      },
      order: [['publishTime', 'DESC']],
      include: [
        {
          model: Models.User,
          as: 'belongsToUser',
        },
        {
          model: Models.Tag,
          as: 'belongsToTag',
        },
      ],
    });
    calculators = calculators.slice(offset).slice(0, limit);
    res.status(200).json({
      message: 'all calculators list search by tag',
      status: true,
      data: calculators,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: 'calculators list not found.',
      status: false,
      error: error.message,
    });
  }
});

// @desc auth all Calculators
// @route GET /api/calculator/profile
// @access Private
// @Author Suvadip Maiti
const profileAllCalculators = asyncHandler(async (req, res) => {
  const userId = parseInt(req.query.id);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const search = req.query.search || ''; // Get search query from query parameters

  try {
    var calculators = [];
    let whereCondition = {};
    if (userId) {
      whereCondition.userId = userId; // Filter by userId column in the Calculator table
    }
    if (search && search !== 'undefined') {
      // Split the search into individual words
      const searchWords = search.split(/\s+/);
      whereCondition = {
        [Op.and]: [
          whereCondition, // Add userId condition
          {
            [Op.or]: searchWords.map((word) => ({
              [Op.or]: [
                { title: { [Op.like]: `%${word}%` } },
                { '$belongsToTag.name$': { [Op.like]: `%${word}%` } },
              ],
            })),
          },
        ],
      };
    }

    const offset = (page - 1) * limit;
    calculators = await Calculator.findAll({
      where: whereCondition,
      order: [['publishTime', 'DESC']],
      include: [
        {
          model: Models.User,
          as: 'belongsToUser',
        },
        {
          model: Models.Tag,
          as: 'belongsToTag',
        },
      ],
    });
    calculators = calculators.slice(offset).slice(0, limit);
    // console.log(calculators);
    res.status(200).json({
      message: 'all mine calculators',
      status: true,
      data: calculators,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message: 'No calculators data found',
      status: false,
    });
  }
});

// @desc create Calculator
// @route POST /api/calculator
// @access Private
// @Author Suvadip Maiti
const createCalculator = asyncHandler(async (req, res) => {
  var userId = req.params.id;
  var title = req.body.title;
  var url = req.body.url;
  var description = req.body.description;
  var tagIds = JSON.parse(req.body.tagIds);
  var publishTime = req.body.publishTime; //utc time

  var fileName = null;
  if (req.files && req.files.file) {
    var calculatorFile = req.files.file;
    fileName = calculatorFile.name;
    calculatorFile.mv('src/public/uploads/calculator/' + calculatorFile.name, function (err) {
      if (err) {
        res.status(400).json({
          status: false,
          message: 'File not uploaded',
        });
      } else {
        fileName = calculatorFile.name;
      }
    });
  }
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      tagIds: tagIds,
      userId: userId,
      title: title,
      description: description,
      publishTime: publishTime,
    },
    {
      tagIds: { type: 'array', empty: false },
      userId: { type: 'string', empty: false },
      title: { type: 'string', empty: false },
      description: { type: 'string' },
      publishTime: { type: 'string', empty: false },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  var slug = 'SmartCalcToolsCalculator' + Date.now();
  const newCalculator = await Calculator.create({
    userId: req.user.id,
    title: req.body.title,
    slug: slug,
    description: req.body.description ? req.body.description : '',
    file: fileName ? fileName : '',
    publishTime: publishTime,
    url: url ? url : '',
  });
  if (tagIds && newCalculator?.id) {
    const calculatorId = newCalculator.id;
    tagIds.map(async (tagId) => {
      const findTag = await Tag.findOne({
        where: { name: tagId.label },
      });
      var catId;
      if (!findTag) {
        var slug = 'SmartCalcToolsTag' + Date.now();
        const newTag = await Tag.create({
          slug: slug,
          name: tagId.label,
          image: 'tag.webp',
        });
        catId = newTag.id;
      } else {
        catId = findTag.id;
      }
      const newTagCalculator = await TagCalculator.create({
        calculatorId: calculatorId,
        tagId: catId,
      });
    });
  }
  res.status(200).json({
    message: 'create calculator',
    status: true,
    data: newCalculator,
  });
});

// @desc show Calculator
// @route GET /api/calculator/:slug
// @access Private
// @Author Suvadip Maiti
const showCalculator = asyncHandler(async (req, res) => {
  try {
    const calculator = await Calculator.findOne({
      where: { slug: req.params.slug },
      include: [
        {
          model: Models.Tag,
          as: 'belongsToTag',
        },
        {
          model: Models.User,
          as: 'belongsToUser',
        },
      ],
    });
    if (calculator && calculator.id) {
      res.status(200).json({
        message: `show user ${req.params.id}`,
        status: true,
        data: calculator,
      });
    } else {
      res.status(400).json({
        message: `No Calculator view found.`,
        status: false,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: `No Calculator view found.`,
      status: false,
    });
  }
});

// @desc update Calculator
// @route PUT /api/calculator/:id
// @access Private
// @Author Suvadip Maiti
const updateCalculator = asyncHandler(async (req, res) => {
  const findCalculator = await Calculator.findOne({
    where: { slug: req.params.slug, userId: req.params.id },
  });
  if (!findCalculator) {
    res.status(200).json({
      message: `You are not eligible to edit this calculator`,
      status: false,
    });
  }
  var userId = req.params.id;
  var title = req.body.title;
  var url = req.body.url;
  var description = req.body.description;
  var tagIds = JSON.parse(req.body.tagIds);
  var publishTime = req.body.publishTime; // utc time

  var fileName = null;
  if (req.files && req.files.file) {
    var calculatorFile = req.files.file;
    fileName = calculatorFile.name;
    calculatorFile.mv('src/public/uploads/calculator/' + calculatorFile.name, function (err) {
      if (err) {
        res.status(400).json({
          status: false,
          message: 'File not uploaded',
        });
      } else {
        fileName = calculatorFile.name;
      }
    });
  }
  
  // unlink image
  if (fileName && findCalculator && findCalculator.file) {
    const fileCalculator = findCalculator.file;
    const directoryPath = 'src/public/uploads/calculator/';
    fs.unlink(directoryPath + fileCalculator, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  //validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      tagIds: tagIds,
      title: title,
      description: description,
      publishTime: publishTime,
    },
    {
      tagIds: { type: 'array', empty: false },
      title: { type: 'string', empty: false },
      description: { type: 'string' },
      publishTime: { type: 'string', empty: false },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const updateCalculatorData = {
    title: title,
    description: description ? description : findCalculator.description,
    file: fileName ? fileName : findCalculator.file,
    publishTime: publishTime,
    url: url ? url : '',
  };
  let updateCalculator = await Models.Calculator.update(updateCalculatorData, {
    where: { slug: req.params.slug, userId: req.params.id },
  });

  if (tagIds && findCalculator?.id) {
    const calculatorId = findCalculator.id;
    TagCalculator.destroy({ where: { calculatorId: calculatorId } });
    tagIds.map(async (tagId) => {
      const findTag = await Tag.findOne({
        where: { name: tagId.label },
      });
      var catId;
      if (!findTag) {
        var slug = 'SmartCalcToolsTag' + Date.now();
        const newTag = await Tag.create({
          slug: slug,
          name: tagId.label,
          image: 'tag.webp',
        });
        catId = newTag.id;
      } else {
        catId = findTag.id;
      }
      const newTagCalculator = await TagCalculator.create({
        calculatorId: calculatorId,
        tagId: catId,
      });
    });
    res.status(200).json({
      message: `update calculator ${req.params.id}`,
      status: true,
      data: updateCalculator,
    });
  }
});

// @desc deleet Calculator
// @route DELETE /api/calculator/:id
// @access Private
// @Author Suvadip Maiti
const deleteCalculator = asyncHandler(async (req, res) => {
  const findCalculator = await Calculator.findOne({
    where: { slug: req.params.slug, userId: req.params.id },
  });
  if (!findCalculator) {
    res.status(200).json({
      message: `You are not eligible to delete this calculator`,
      status: false,
    });
  }
  // unlink
  if (findCalculator && findCalculator.file) {
    const fileCalculator = findCalculator.file;
    const directoryPath = 'src/public/uploads/calculator/';
    fs.unlink(directoryPath + fileCalculator, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }
  const calculatorId = findCalculator.id;
  TagCalculator.destroy({ where: { calculatorId: calculatorId } });

  await findCalculator.destroy();

  res.status(200).json({
    message: `calculator sucessfully deleted`,
    status: true,
    data: findCalculator,
  });
});

module.exports = {
  allCalculators: allCalculators,
  allCalculatorsByTag: allCalculatorsByTag,
  profileAllCalculators: profileAllCalculators,
  createCalculator: createCalculator,
  showCalculator: showCalculator,
  updateCalculator: updateCalculator,
  deleteCalculator: deleteCalculator,
};
