const asyncHandler = require('express-async-handler');

const Models = require('../models');

const Calculator = Models.Calculator;
const Tag = Models.Tag;

const Collection = Models.Collection;

const { SitemapStream, streamToPromise } = require('sitemap');

const RSS = require('rss');

const moment = require('moment');



// @desc all sitemaps

// @route GET /api/sitemap/sitemap.xml

// @access Private

// @Author Suvadip Maiti

const allsitemap = asyncHandler(async (req, res) => {



  const xml = await generateSitemap();

  res.header('Content-Type', 'application/xml');

  res.send(xml);



});



// @desc all sitemaps calculators

// @route GET /api/sitemap/sitemap-calculator.xml

// @access Private

// @Author Suvadip Maiti

const allsitemapcalculator = asyncHandler(async (req, res) => {



  const xml = await generateSitemapcalculator();

  res.header('Content-Type', 'application/xml');

  res.send(xml);



});





// @desc all sitemaps calculators

// @route GET /api/sitemap/sitemap-calculator-data

// @access Private

// @Author Suvadip Maiti

const allsitemapcalculatorData = asyncHandler(async (req, res) => {

  

  const calculators = await Calculator.findAll({

    order: [['createdAt', 'DESC']],

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
    limit: 20,
  });

  

  res.status(200).json({

    message: 'all calculators',

    status: true,

    data: calculators,

  });



});



// @desc all sitemaps tags

// @route GET /api/sitemap/sitemap-tag-data

// @access Private

// @Author Suvadip Maiti

const allsitemaptagData = asyncHandler(async (req, res) => {

  

  const tags = await Tag.findAll({
    order: [['createdAt', 'DESC']],
    limit: 20,
  });

  

  res.status(200).json({

    message: 'all tags',

    status: true,

    data: tags,

  });



});



// @desc all sitemaps collections

// @route GET /api/sitemap/sitemap-collection.xml

// @access Private

// @Author Suvadip Maiti

const allsitemapcollection = asyncHandler(async (req, res) => {



  const xml = await generateSitemapcollection();

  res.header('Content-Type', 'application/xml');

  res.send(xml);



});





// @desc all sitemaps collections

// @route GET /api/sitemap/sitemap-collection-data

// @access Private

// @Author Suvadip Maiti

const allsitemapcollectionData = asyncHandler(async (req, res) => {



  const collections = await Collection.findAll({

    order: [['createdAt', 'DESC']],

    include: [

      {

        model: Models.User,

        as: 'belongsToUser',

      },

    ],
    limit: 20,
  });



  res.status(200).json({

    message: 'all collections',

    status: true,

    data: collections,

  });



});



// @desc all sitemaps rss feed

// @route GET /api/sitemap/rss

// @access Private

// @Author Suvadip Maiti

const allrss = asyncHandler(async (req, res) => {



  const xml = await generateRSSFeed();

  res.header('Content-Type', 'application/xml');

  res.send(xml);



});





// @desc all sitemaps rss feed

// @route GET /api/sitemap/rss-data

// @access Private

// @Author Suvadip Maiti

const allrssData = asyncHandler(async (req, res) => {



  const calculators = await Calculator.findAll({

    order: [['createdAt', 'DESC']],

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
    limit: 20,
  });



  res.status(200).json({

    message: 'all rss',

    status: true,

    data: calculators,

  });



});


// @desc all sitemaps rss tag feed

// @route GET /api/sitemap/rss-tag-data

// @access Private

// @Author Suvadip Maiti

const allrsscollectionData = asyncHandler(async (req, res) => {



  const collections = await Collection.findAll({

    order: [['createdAt', 'DESC']],
    limit: 20,

  });



  res.status(200).json({

    message: 'all rss collections',

    status: true,

    data: collections,

  });



});



const generateSitemap = async () => {



  const smStream = new SitemapStream({ hostname: process.env.URL }); // Replace with your hostname



  const urls = [

    { url: '/', changefreq: 'daily', priority: 0.8, lastmod : new Date() },

    { url: '/collections', changefreq: 'daily', priority: 0.5, lastmod : new Date() },

    { url: '/calculators', changefreq: 'daily', priority: 0.5, lastmod : new Date() },

  ];



  urls.forEach(url => {

    smStream.write(url);

  });



  smStream.end();



  return streamToPromise(smStream).then(data => data.toString());

};



const generateSitemapcalculator = async () => {

  const calculators = await Calculator.findAll({

    order: [['createdAt', 'DESC']],

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

  

  const smStream = new SitemapStream({ hostname: process.env.URL }); // Replace with your hostname



  // Your logic to generate URLs dynamically

  var urls = [];

    if(calculators && calculators.length > 0){

      for(var i = 0 ; i < calculators.length ; i++){

        urls.push({ url: `/calculator/${calculators[i]?.slug}`, changefreq: 'daily', priority: 0.8, lastmod : calculators[i]?.createdAt? calculators[i]?.createdAt : new Date() });

      }

    }



  urls.forEach(url => {

    smStream.write(url);

  });



  smStream.end();



  return streamToPromise(smStream).then(data => data.toString());

};



const generateSitemapcollection = async () => {

  const collections = await Collection.findAll({

    order: [['createdAt', 'DESC']],

    include: [

      {

        model: Models.User,

        as: 'belongsToUser',

      },

    ],

  });

  

  const smStream = new SitemapStream({ hostname: process.env.URL }); // Replace with your hostname



  // Your logic to generate URLs dynamically

  var urls = [];

    if(collections && collections.length > 0){

      for(var i = 0 ; i < collections.length ; i++){

        urls.push({ url: `/collection/${collections[i]?.slug}`, changefreq: 'daily', priority: 0.8, lastmod : collections[i]?.createdAt? collections[i]?.createdAt : new Date() });

      }

    }



  urls.forEach(url => {

    smStream.write(url);

  });



  smStream.end();



  return streamToPromise(smStream).then(data => data.toString());

};



const generateRSSFeed = async () => {

  const calculators = await Calculator.findAll({

    order: [['createdAt', 'DESC']],

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



  const feed = new RSS({

    title: process.env.URL, // Replace with your website's name

    description: 'smart calculator tools', // Replace with your website's description

    feed_url: `${process.env.API_URL}/api/sitemap/rss`, // Replace with your website's RSS feed URL

    site_url: process.env.URL, // Replace with your website's URL

    pubDate: new Date(),

  });



  // Add items/calculators to the feed

  calculators.forEach((calculator) => {

    feed.item({

      title: calculator?.title? calculator?.title : null,

      description: calculator && calculator?.description ? calculator?.description : '',

      url: `${process.env.URL}/${calculator?.slug}`,

      author: calculator?.belongsToUser?.name ? calculator?.belongsToUser?.name : 'User',

      date: calculator?.createdAt? moment(calculator?.createdAt).toDate() : moment(calculator.date).toDate(),

    });

  });



  return feed.xml({ indent: true });

};



module.exports = {

  allsitemap: allsitemap,

  allsitemapcalculator: allsitemapcalculator,

  allsitemapcalculatorData: allsitemapcalculatorData,
  allsitemaptagData: allsitemaptagData,

  allsitemapcollection: allsitemapcollection,

  allsitemapcollectionData: allsitemapcollectionData,

  allrss: allrss,

  allrssData: allrssData,
  allrsscollectionData: allrsscollectionData,

};

