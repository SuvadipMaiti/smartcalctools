const asyncHandler = require('express-async-handler');
const Models = require('../models');
const Comment = Models.Comment;
const User = Models.User;
const Validator = require('fastest-validator');
const { Op } = require('sequelize');
var Sequelize = require('sequelize');
const fs = require('fs');
const moment = require('moment');

// @desc all Comments
// @route GET /api/comment/list
// @access Private
// @Author Suvadip Maiti
const allComments = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const calculatorId = parseInt(req.query.calculatorId) || null;

  const offset = (page - 1) * limit;
  var comments = await Comment.findAll({
    where: {
        calculatorId : calculatorId
    },
    order: [['createdAt', 'DESC']],
    include: [
      {
        model: Models.User,
        as: 'belongsToUser',
      },
    ],
    offset,
    limit
  });
  res.status(200).json({
    message: 'all comments',
    status: true,
    data: comments,
  });
});


// @desc create Comment
// @route POST /api/comment
// @access Private
// @Author Suvadip Maiti
const createComment = asyncHandler(async (req, res) => {
  var userId = req.params.userId;
  var comment = req.body.comment;
  var calculatorId = req.body.calculatorId;
  // validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      calculatorId: calculatorId,
      userId: userId,
      comment: comment,
    },
    {
      calculatorId: { type: 'string', empty: false },
      userId: { type: 'string', empty: false },
      comment: { type: 'string', empty: false },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const newComment = await Comment.create({
    userId: userId,
    comment: comment,
    calculatorId: calculatorId,
  });
  res.status(200).json({
    message: 'create comment',
    status: true,
    data: newComment,
  });
});

// @desc update cOMMENT
// @route PUT /api/COMMENT/:id
// @access Private
// @Author Suvadip Maiti
const updateComment = asyncHandler(async (req, res) => {
  const findComment = await Comment.findOne({
    where: { id: req.params.commentId, userId: req.params.userId },
  });
  if (!findComment) {
    res.status(200).json({
      message: `You are not eligible to edit this comment`,
      status: false,
    });
  }
  var commentId = req.params.commentId;
  var userId = req.params.userId;
  var comment = req.body.comment;

  //validation start
  const validator = new Validator();
  const validationResponse = validator.validate(
    {
      userId: userId,
      comment: comment,
      commentId: commentId,
    },
    {
      userId: { type: 'string', empty: false },
      comment: { type: 'string', empty: false },
      commentId: { type: 'string' },
    }
  );
  if (validationResponse !== true) {
    return res.status(400).json({
      status: false,
      message: validationResponse[0].message,
    });
  }
  //validation end
  const updateCommentData = {
    comment: comment,
  };
  let updateComment = await Models.Comment.update(updateCommentData, {
    where: { id: req.params.commentId, userId: req.params.userId },
  });
  res.status(200).json({
    message: `update comment ${req.params.commentId}`,
    status: true,
    data: updateComment,
  });
});

// @desc deleet Comment
// @route DELETE /api/comment/:id
// @access Private
// @Author Suvadip Maiti
const deleteComment = asyncHandler(async (req, res) => {
  const findComment = await Comment.findOne({
    where: { id: req.params.commentId, userId: req.params.userId },
  });
  if (!findComment) {
    res.status(200).json({
      message: `You are not eligible to delete this comment`,
      status: false,
    });
  }
  await findComment.destroy();
  res.status(200).json({
    message: `comment sucessfully deleted`,
    status: true,
    data: findComment,
  });
});

module.exports = {
  allComments: allComments,
  createComment: createComment,
  updateComment: updateComment,
  deleteComment: deleteComment,
};
