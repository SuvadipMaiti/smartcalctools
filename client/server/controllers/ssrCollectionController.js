const asyncHandler = require('express-async-handler');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// @desc ssr collections view
// @route GET /collections
// @access Private
// @Author Suvadip Maiti
const collectionView = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  try {
    const response = await axios.get(
      `${process.env.API_FILE_PATH}/api/collection/${slug}`
    );
    if (response && response.data) {
      const collection = response.data.data;
      var name = collection?.title ? collection?.title : '';
      var description = collection?.description ? collection?.description ?.replace(/(<([^>]+)>)/gi, '')
            .replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')
            .substring(0, 400) : `Use our free ${name} to quickly and accurately calculate your values. Simple, fast, and reliable.`;

      var title = `${name}`;
      var description = `${description}`;

      var key = `${name}, online ${name} tool, free ${name}, ${name.toLowerCase()} formula, SmartCalcTools`;
      var author = 'SmartCalcTools';
      var image = collection.file ? process.env.API_FILE_PATH + '/uploads/collection/' + collection.file : process.env.FILE_PATH + '/assets/static/companylogo.png';
      var currentUrl = process.env.FILE_PATH + '/collection/' + slug;

      serveModifiedHtml(req, res, {
        title: title,
        description: description,
        keywords: key,
        author: author,
        currentUrl: currentUrl,
        image: image,
      });
    }
  } catch (error) {
    // return res.redirect('/');
    return res.status(500).send('Oops, calculator View not found!');
  }
});

function serveModifiedHtml(
  req,
  res,
  { title, description, keywords, author, currentUrl, image }
) {
  const indexFile = path.resolve(
    path.join(__dirname, '../', process.env.BUILD_PATH, 'index.html')
  );

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Oops, calculator View not found!');
    }
    // Find the position of <head> in the HTML
    const headIndex = data.indexOf('<head>');
    // Find the position just after <head> collection
    const insertIndex = headIndex + '<head>'.length;

    // Construct the updated HTML with the new meta collections inserted just after <head> collection
    const updatedHtml =
      data.slice(0, insertIndex) +
      `
      <title>${title}</title>
      <meta name="title" content="${title}" />
      <meta name="description" content="${description}" />
      <meta name="summary" content="${description}" />
      <meta name="keywords" content="${keywords}" />
      <meta name="author" content="${author}" />
      <meta name="source" content="${author}" />
      <link rel="canonical" href="${currentUrl}" />
      <meta property="url" content="${currentUrl}" />
      <meta property="originalUrl" content="${currentUrl}" />
      <meta property="image" content="${image}" />
      <meta property="media" content="${image}" />
      <meta property="shareMediaCategory" content="${image}" />

      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <meta property="og:image" content="${image}" />
      <meta property="og:image:secure_url" content="${image}" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content="${currentUrl}" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${title}" />
      <meta name="twitter:description" content="${description}" />
      <meta name="twitter:image" content="${image}" />

      <meta property="og:site_name" content="SmartCalcTools: smart calculator tools" />
    ` +
      data.slice(insertIndex);

    // Send the updated HTML as the response
    return res.send(updatedHtml);
  });
}

module.exports = {
  collectionView: collectionView,
};
