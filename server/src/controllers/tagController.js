const asyncHandler = require('express-async-handler');
const Models = require('../models');
const Tag = Models.Tag;
const Calculator = Models.Calculator;
const TagCalculator = Models.TagCalculator;



// @desc all Calculators
// @route GET /api/calculator
// @access Private
// @Author Suvadip Maiti
const allTags = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const offset = (page - 1) * limit;
  const tags = await Tag.findAll({
    order: [
      ['countCalculator', 'DESC'],
      ['createdAt', 'DESC']
    ],
    offset,
    limit,
  });
  res.status(200).json({
    message: 'all tags',
    status: true,
    data: tags,
  });

});



// @desc show Tag
// @route GET /api/tag/:slug
// @access Private
// @Author Suvadip Maiti
const showTag = asyncHandler(async (req, res) => {
  try {
    const tag = await Tag.findOne({
      where: { slug: req.params.slug },
    });
    if (tag && tag.id) {
      const findCalculators = await TagCalculator.findAll({
        where: { tagId: tag.id },
        order: [['createdAt', 'DESC']],
      });
      const CalculatorData = await Calculator.findOne({
        where: { id: findCalculators[0].calculatorId },
      });
      await Tag.update({
        countCalculator: findCalculators.length,
        image: CalculatorData.file,
        imageUrl: CalculatorData.fileUrl,
      }, {
        where: { id: tag.id }
      });
      const updatedTag = await Tag.findOne({
        where: { id: tag.id }
      });
      res.status(200).json({
        message: `show tag ${req.params.id}`,
        status: true,
        data: updatedTag,
      });
    } else {
      res.status(400).json({
        message: `No Tag view found.`,
        status: false,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: `No Tag view found.`,
      status: false,
    });
  }
});


module.exports = {

  allTags: allTags,
  showTag: showTag,

};

