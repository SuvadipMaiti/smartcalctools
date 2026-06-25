const express = require('express');
const sitemapController = require('../controllers/sitemapController');


const router = express.Router();

router.get('/sitemap.xml',sitemapController.allsitemap);
router.get('/sitemap-calculator.xml',sitemapController.allsitemapcalculator);
router.get('/sitemap-collection.xml',sitemapController.allsitemapcollection);
router.get('/rss.xml',sitemapController.allrss);
router.get('/rss-collection.xml',sitemapController.allrsscollection);

module.exports = router;