const asyncHandler = require('express-async-handler');
const Models = require('../models');
const Like = Models.Like;
const View = Models.View;
const Calculator = Models.Calculator;
const Validator = require('fastest-validator');

// @desc create like
// @route POST /api/like-view/like
// @access Private
// @Author Suvadip Maiti
const createLike = asyncHandler(async (req, res) => {
  var userId = req.body.userId;
  var calculatorId = req.body.calculatorId;
  var message = '';
  let countLike;
  //validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      userId: userId,
      calculatorId: calculatorId,
    },
    {
      userId: { type: 'string', empty: false },
      calculatorId: { type: 'string', empty: false },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const findLike = await Like.findOne({
    where: { userId: userId, calculatorId: calculatorId },
  });
  if (findLike) {
    findLike.destroy();
    message = 'Like removed';
  } else {
    await Like.create({
      userId: userId,
      calculatorId: calculatorId,
    });
    message = 'Liked';
  }
  countLike = await Like.count({
    where: { calculatorId: calculatorId },
  });
  await Calculator.update(
    {
      likes: countLike,
    },
    {
      where: {
        id: calculatorId,
      },
    }
  );
  res.status(200).json({
    message: message,
    status: true,
    data: countLike,
  });
});


// @desc create like
// @route POST /api/like-view/like-count
// @access Private
// @Author Suvadip Maiti
const countLike = asyncHandler(async (req, res) => {
  var userId = req.body.userId;
  var calculatorId = req.body.calculatorId;
  var liked = false;
  likeCount = await Like.count({
    where: { calculatorId: calculatorId },
  });
  viewCount = await View.count({
    where: { calculatorId: calculatorId },
  });
  await Calculator.update(
    {
      likes: likeCount,
      views:viewCount,
    },
    {
      where: {
        id: calculatorId,
      },
    }
  );

  if(userId){
    const findLike = await Like.findOne({
      where: { userId: userId, calculatorId: calculatorId },
    });
    if(findLike){
      liked = true;
    }
  }
 
  res.status(200).json({
    message: 'counted',
    status: true,
    data: {likeCount,viewCount,liked},
  });
});

// @desc create view
// @route POST /api/like-view/view
// @access Private
// @Author Suvadip Maiti
const createView = asyncHandler(async (req, res) => {
  var calculatorId = req.body.calculatorId;
//   var ip = req.ip;
  var ip = getClientIp(req);
  //validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      calculatorId: calculatorId,
    },
    {
      calculatorId: { type: 'string', empty: false },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  let createView = await View.create({
    ip: ip,
    calculatorId: calculatorId,
  });
  const countView = await View.count({
    where: { calculatorId: calculatorId },
  });
  const UpdateCalculatorView = await Calculator.update(
    {
      views: countView,
    },
    {
      where: {
        id: calculatorId,
      },
    }
  );
  res.status(200).json({
    message: `View`,
    status: true,
    data: UpdateCalculatorView,
  });
});

function getClientIp(req) {
  const xForwardedFor = req.headers['x-forwarded-for'];
  if (xForwardedFor) {
    // in case of multiple IPs, take the first one
    return xForwardedFor.split(',')[0].trim();
  }
  return req.connection.remoteAddress || req.socket.remoteAddress || req.ip;
}

module.exports = {
  createLike: createLike,
  countLike: countLike,
  createView: createView,
};
