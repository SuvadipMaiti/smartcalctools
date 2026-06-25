const asyncHandler = require('express-async-handler');
const axios = require('axios');
const { SitemapStream, streamToPromise } = require('sitemap');
const RSS = require('rss');
const moment = require('moment');

// @desc all sitemaps
// @route GET /sitemap/sitemap.xml
// @access Private
// @Author Suvadip Maiti
const allsitemap = asyncHandler(async (req, res) => {
  const xml = await generateSitemap();
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// @desc all sitemaps calculators
// @route GET /sitemap/sitemap-calculator.xml
// @access Private
// @Author Suvadip Maiti
const allsitemapcalculator = asyncHandler(async (req, res) => {
  const xml = await generateSitemapcalculator();
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// @desc all sitemaps collections
// @route GET /sitemap/sitemap-collection.xml
// @access Private
// @Author Suvadip Maiti
const allsitemapcollection = asyncHandler(async (req, res) => {
  const xml = await generateSitemapcollection();
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// @desc all sitemaps rss feed
// @route GET /sitemap/rss
// @access Private
// @Author Suvadip Maiti
const allrss = asyncHandler(async (req, res) => {
  const xml = await generateRSSFeed();
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

// @desc all sitemaps rss collection feed
// @route GET /sitemap/rss-collection
// @access Private
// @Author Suvadip Maiti
const allrsscollection = asyncHandler(async (req, res) => {
  const xml = await generateRSSFeedCollection();
  res.header('Content-Type', 'application/xml');
  res.send(xml);
});

const generateSitemap = async () => {
  const smStream = new SitemapStream({ hostname: process.env.FILE_PATH }); // Replace with your hostname

  const urls = [
    { url: '/', changefreq: 'daily', priority: 0.8, lastmod: new Date() },
    {
      url: '/collections',
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date(),
    },
  ];

  urls.forEach((url) => {
    smStream.write(url);
  });

  smStream.end();

  return streamToPromise(smStream).then((data) => data.toString());
};

const generateSitemapcalculator = async () => {
  const response = await axios.get(
    `${process.env.API_FILE_PATH}/api/sitemap/sitemap-calculator-data`
  );
  if (response && response.data) {
    const calculators = response.data.data;

    const smStream = new SitemapStream({ hostname: process.env.FILE_PATH }); // Replace with your hostname

    // Your logic to generate URLs dynamically
    var urls = [];
    if (calculators && calculators.length > 0) {
      for (var i = 0; i < calculators.length; i++) {
        urls.push({
          url: `/calculator/${calculators[i]?.slug}`,
          changefreq: 'daily',
          priority: 0.8,
          lastmod: calculators[i]?.utcTime
            ? calculators[i]?.utcTime
            : new Date(),
        });
      }
    }

    urls.forEach((url) => {
      smStream.write(url);
    });

    smStream.end();

    return streamToPromise(smStream).then((data) => data.toString());
  } else {
    return null;
  }
};

const generateSitemapcollection = async () => {
  const response = await axios.get(
    `${process.env.API_FILE_PATH}/api/sitemap/sitemap-collection-data`
  );
  if (response && response.data) {
    const collections = response.data.data;

    const smStream = new SitemapStream({ hostname: process.env.FILE_PATH }); // Replace with your hostname

    // Your logic to generate URLs dynamically
    var urls = [];
    if (collections && collections.length > 0) {
      for (var i = 0; i < collections.length; i++) {
        urls.push({
          url: `/collection/${collections[i]?.slug}`,
          changefreq: 'daily',
          priority: 0.8,
          lastmod: collections[i]?.createdAt
            ? collections[i]?.createdAt
            : new Date(),
        });
      }
    }

    urls.forEach((url) => {
      smStream.write(url);
    });

    smStream.end();

    return streamToPromise(smStream).then((data) => data.toString());
  } else {
    return null;
  }
};

const generateRSSFeed = async () => {
  const response = await axios.get(
    `${process.env.API_FILE_PATH}/api/sitemap/rss-data`
  );
  const calculators = response.data.data;

  const feed = new RSS({
    title: process.env.FILE_PATH, // Replace with your website's name
    description: 'smart calculator tools', // Replace with your website's description
    feed_url: `${process.env.FILE_PATH}/sitemap/rss`, // Replace with your website's RSS feed URL
    site_url: process.env.FILE_PATH, // Replace with your website's URL
    pubDate: new Date(),
  });

  // Add items/calculators to the feed
  calculators.forEach((calculator) => {
    feed.item({
      title: calculator?.title ? calculator?.title : null,
      description:
        calculator && calculator?.description
          ? calculator?.description
              ?.replace(/(<([^>]+)>)/gi, '')
              .replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')
              .substring(0, 400)
          : `Use our free ${title} to quickly and accurately calculate your values. Simple, fast, and reliable.`,
      url: `${process.env.FILE_PATH}/calculator/${calculator?.slug}`,
      author: 'SmartCalcTools',
      date: calculator?.utcTime
        ? moment(calculator?.utcTime).toDate()
        : moment(calculator.date).toDate(),
    });
  });

  return feed.xml({ indent: true });
};

const generateRSSFeedCollection = async () => {
  const response = await axios.get(
    `${process.env.API_FILE_PATH}/api/sitemap/rss-collection-data`
  );
  const collections = response.data.data;

  const feed = new RSS({
    title: process.env.FILE_PATH, // Replace with your website's name
    description: 'smart calculator tools', // Replace with your website's description
    feed_url: `${process.env.FILE_PATH}/sitemap/rss-collection`, // Replace with your website's RSS feed URL
    site_url: process.env.FILE_PATH, // Replace with your website's URL
    pubDate: new Date(),
  });

  // Add items/collections to the feed
  collections.forEach((collection) => {
    feed.item({
      title: `${collection?.title}`,
      description: collection?.description
        ? collection.description
            .replace(/(<([^>]+)>)/gi, '') // remove HTML tags
            .replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ') // clean entities
            .substring(0, 400)
        : `Use our free ${title} to quickly and accurately calculate your values. Simple, fast, and reliable.`,
      url: `${process.env.FILE_PATH}/collection/${collection?.slug}`,
      author: 'SmartCalcTools',
      date: collection?.createdAt
        ? moment(collection?.createdAt).toDate()
        : moment(collection.updatedAt).toDate(),
    });
  });

  return feed.xml({ indent: true });
};

module.exports = {
  allsitemap: allsitemap,
  allsitemapcalculator: allsitemapcalculator,
  allsitemapcollection: allsitemapcollection,
  allrss: allrss,
  allrsscollection: allrsscollection,
};
