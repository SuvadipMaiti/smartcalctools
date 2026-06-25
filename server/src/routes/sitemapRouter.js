const express = require('express');
const sitemapController = require('../controllers/sitemapController');


const router = express.Router();

router.get('/sitemap.xml',sitemapController.allsitemap);
router.get('/sitemap-calculator.xml',sitemapController.allsitemapcalculator);
router.get('/sitemap-calculator-data',sitemapController.allsitemapcalculatorData);
router.get('/sitemap-tag-data',sitemapController.allsitemaptagData);
router.get('/sitemap-collection.xml',sitemapController.allsitemapcollection);
router.get('/sitemap-collection-data',sitemapController.allsitemapcollectionData);
router.get('/rss.xml',sitemapController.allrss);
router.get('/rss-data',sitemapController.allrssData);
router.get('/rss-collection-data',sitemapController.allrsscollectionData);

module.exports = router;