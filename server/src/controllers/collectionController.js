const asyncHandler = require('express-async-handler');

const Models = require('../models');

const Collection = Models.Collection;

const CalculatorInCollection = Models.CalculatorInCollection;

const Validator = require('fastest-validator');

const { Op } = require('sequelize');

var Sequelize = require('sequelize');

const fs = require('fs');



// @desc all Collections

// @route GET /api/collection

// @access Private

// @Author Suvadip Maiti

const allCollections = asyncHandler(async (req, res) => {

  const collections = await Collection.findAll({

    order: [['createdAt', 'DESC']],

    include: [

      {

        model: Models.User,

        as: 'belongsToUser',

      },

    ],

  });

  res.status(200).json({

    message: 'all collections',

    status: true,

    data: collections,

  });

});



// @desc auth all Collections

// @route GET /api/collection/profile/:id

// @access Private

// @Author Suvadip Maiti

const profileAllCollections = asyncHandler(async (req, res) => {

  const collections = await Collection.findAll({

    where: { userId: req.params.id },

    order: [['createdAt', 'DESC']],

    include: [

      {

        model: Models.User,

        as: 'belongsToUser',

      },

    ],

  });

  res.status(200).json({

    message: 'all mine collections',

    status: true,

    data: collections,

  });

});



// @desc create Collection

// @route POST /api/collection

// @access Private

// @Author Suvadip Maiti

const createCollection = asyncHandler(async (req, res) => {

  var userId = req.params.id;

  var title = req.body.title;

  var description = req.body.description;



  var fileName = null;

  if (req.files && req.files.file) {

    var collectionFile = req.files.file;

    fileName = collectionFile.name;

    collectionFile.mv(

      'src/public/uploads/collection/' + collectionFile.name,

      function (err) {

        if (err) {

          res.status(400).json({

            status: false,

            message: 'File not uploaded',

          });

        } else {

          fileName = collectionFile.name;

        }

      }

    );

  }

  // validation start

  const validator = new Validator();

  const validationResponse = validator.validate(

    {

      userId: userId,

      title: title,

      description: description,

    },

    {

      userId: { type: 'string', empty: false },

      title: { type: 'string', empty: false },

      description: { type: 'string' },

    }

  );

  if (validationResponse !== true) {

    return res.status(400).json({

      status: false,

      message: validationResponse[0].message,

    });

  }

  //validation end

  var slug = 'SmartCalcToolsCollection' + Date.now();

  const newCollection = await Collection.create({

    userId: req.user.id,

    title: req.body.title,

    slug: slug,

    description: req.body.description ? req.body.description : '',

    file: fileName ? fileName : '',

  });

  res.status(200).json({

    message: 'create collection',

    status: true,

    data: newCollection,

  });

});



// @desc show Collection

// @route GET /api/collection/:id

// @access Private

// @Author Suvadip Maiti

const showCollection = asyncHandler(async (req, res) => {

  const collection = await Collection.findOne({

    where: { slug: req.params.slug },

    include: [

      {

        model: Models.User,

        as: 'belongsToUser',

      },

      {

        model: Models.CalculatorInCollection,

        as: 'hasManyCalculatorInCollections',

        include: [

          {

            model: Models.Calculator,

            as: 'belongsToCalculator',

          },

        ],

      },

    ],

  });

  // console.log('collection',collection.hasManyCalculatorInCollections);

  // console.log('collection',collection.hasManyCalculatorInCollections[0].belongsToCalculator);

  res.status(200).json({

    message: `show user ${req.params.id}`,

    status: true,

    data: collection,

  });

});



// @desc show Collection

// @route GET /api/collection/calculator-in-collection-show/:calculatorInCollectionId

// @access Private

// @Author Suvadip Maiti

const calculatorInCollectionShow = asyncHandler(async (req, res) => {

  const calculatorInCollection = await CalculatorInCollection.findOne({

    where: { id: req.params.calculatorInCollectionId },

    include: [

      {

        model: Models.User,

        as: 'belongsToUser',

      },

      {

        model: Models.Calculator,

        as: 'belongsToCalculator',

      },

      {

        model: Models.Collection,

        as: 'belongsToCollection',

      },

    ],

  });

  // console.log('calculatorInCollection',calculatorInCollection);

  // console.log('calculatorInCollection',calculatorInCollection.hasManyCalculatorInCollections[0].belongsToCalculator);

  res.status(200).json({

    message: `calculator in collection show`,

    status: true,

    data: calculatorInCollection,

  });

});



// @desc update Collection

// @route PUT /api/collection/:id

// @access Private

// @Author Suvadip Maiti

const updateCollection = asyncHandler(async (req, res) => {

  const findCollection = await Collection.findOne({

    where: { slug: req.params.slug, userId: req.params.id },

  });

  if (!findCollection) {

    res.status(200).json({

      message: `You are not eligible to edit this collection`,

      status: false,

    });

  }

  var userId = req.params.id;

  var title = req.body.title;

  var description = req.body.description;



  var fileName = null;

  if (req.files && req.files.file) {

    var collectionFile = req.files.file;

    fileName = collectionFile.name;

    collectionFile.mv(

      'src/public/uploads/collection/' + collectionFile.name,

      function (err) {

        if (err) {

          res.status(400).json({

            status: false,

            message: 'File not uploaded',

          });

        } else {

          fileName = collectionFile.name;

        }

      }

    );

  }

  // unlink image

  if (fileName && findCollection && findCollection.file) {

    const fileCollection = findCollection.file;

    const directoryPath = 'src/public/uploads/collection/';

    fs.unlink(directoryPath + fileCollection, (err) => {

      if (err) {

        console.log(err);

      }

    });

  }

  //validation start

  const validator = new Validator();

  const validationResponse = validator.validate(

    {

      title: title,

      description: description,

    },

    {

      title: { type: 'string', empty: false },

      description: { type: 'string' },

    }

  );

  if (validationResponse !== true) {

    return res.status(400).json({

      status: false,

      message: validationResponse[0].message,

    });

  }

  //validation end

  const updateCollectionData = {

    title: title,

    description: description ? description : findCollection.description,

    file: fileName ? fileName : findCollection.file,

  };

  let updateCollection = await Models.Collection.update(updateCollectionData, {

    where: { slug: req.params.slug, userId: req.params.id },

  });

  res.status(200).json({

    message: `update collection ${req.params.id}`,

    status: true,

    data: updateCollection,

  });

});



// @desc update Collection

// @route PUT /api/collection/calculator-addto-collection/:id

// @access Private

// @Author Suvadip Maiti

const calculatorAddtoCollection = asyncHandler(async (req, res) => {

  const findCollection = await Collection.findOne({

    where: { slug: req.params.collectionSlug, userId: req.params.id },

  });

  if (!findCollection) {

    res.status(200).json({

      message: `You are not eligible to edit this collection`,

      status: false,

    });

  }

  var userId = req.params.id;

  var calculatorno = req.body.calculatorno;

  var calculatorId = req.body.calculatorId;

  // console.log(req.body);

  // console.log(req.params);

  //validation start

  const validator = new Validator();

  const validationResponse = validator.validate(

    {

      userId: userId,

      calculatorno: calculatorno,

      calculatorId: calculatorId,

    },

    {

      userId: { type: 'string', empty: false },

      calculatorno: { type: 'string', empty: false },

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

  if (calculatorno && parseInt(calculatorno) <= 0) {

    return res.status(400).json({

      status: false,

      message: 'Please insert correct calculator no',

    });

  }



  let calculatorAddtoCours = await Models.CalculatorInCollection.create({

    calculatorno: calculatorno,

    calculatorId: calculatorId,

    collectionId: findCollection.id,

    userId: userId,

  });

  res.status(200).json({

    message: `calculator added to this collection`,

    status: true,

    data: calculatorAddtoCours,

  });

});



// @desc update Collection

// @route PUT /api/collection/calculator-editto-collection/:id

// @access Private

// @Author Suvadip Maiti

const calculatorEdittoCollection = asyncHandler(async (req, res) => {

  const findCollection = await Collection.findOne({

    where: { slug: req.params.collectionSlug, userId: req.params.id },

  });

  if (!findCollection) {

    res.status(200).json({

      message: `You are not eligible to edit this collection`,

      status: false,

    });

  }

  var userId = req.params.id;

  var calculatorno = req.body.calculatorno;

  var calculatorId = req.body.calculatorId;

  var calculatorInCollectionId = req.body.calculatorInCollectionId;

  // console.log(req.body);

  // console.log(req.params);

  //validation start

  const validator = new Validator();

  const validationResponse = validator.validate(

    {

      userId: userId,

      calculatorno: calculatorno,

      calculatorId: calculatorId,

      calculatorInCollectionId: calculatorInCollectionId,

    },

    {

      userId: { type: 'string', empty: false },

      calculatorno: { type: 'string', empty: false },

      calculatorId: { type: 'string', empty: false },

      calculatorInCollectionId: { type: 'string', empty: false },

    }

  );

  if (validationResponse !== true) {

    return res.status(400).json({

      status: false,

      message: validationResponse[0].message,

    });

  }

  //validation end

  if (calculatorno && parseInt(calculatorno) <= 0) {

    return res.status(400).json({

      status: false,

      message: 'Please insert correct calculator no',

    });

  }

  let calculatorEdittoCours = await Models.CalculatorInCollection.update({

    calculatorno: calculatorno,

    calculatorId: calculatorId,

    collectionId: findCollection.id,

    userId: userId,

  }, {

    where: { id: calculatorInCollectionId },

  });

  res.status(200).json({

    message: `calculator edited to this collection`,

    status: true,

    data: calculatorEdittoCours,

  });

});



module.exports = {

  allCollections: allCollections,

  profileAllCollections: profileAllCollections,

  createCollection: createCollection,

  showCollection: showCollection,

  updateCollection: updateCollection,

  calculatorAddtoCollection: calculatorAddtoCollection,

  calculatorEdittoCollection: calculatorEdittoCollection,

  calculatorInCollectionShow: calculatorInCollectionShow,

};

