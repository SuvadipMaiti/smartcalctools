const asyncHandler = require('express-async-handler');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// @desc ssr calculator view
// @route GET /calculator/:slug
// @access Private
// @Author Suvadip Maiti
const calculatorView = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  try {
    const response = await axios.get(
      `${process.env.API_FILE_PATH}/api/calculator/${slug}`
    );
    if (response && response.data) {
      const calculator = response.data.data;
      var title = calculator?.title ? calculator?.title : '';
      var description = calculator?.description
        ? calculator?.description
            ?.replace(/(<([^>]+)>)/gi, '')
            .replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, ' ')
            .substring(0, 400)
        : `Use our free ${title} to quickly and accurately calculate your values. Simple, fast, and reliable.`;

      var key = `${title}, online ${title} tool, free ${title}, ${title.toLowerCase()} formula, SmartCalcTools, `;
      calculator?.belongsToTag?.map((tag) => {
        return (key += tag.name + ', ');
      });

      var author = 'SmartCalcTools';
      var image = calculator?.fileUrl ? calculator?.fileUrl : process.env.API_FILE_PATH + '/uploads/calculator/' + calculator?.file;
      var currentUrl = process.env.FILE_PATH + '/calculator/' + slug;

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
    // Find the position just after <head> tag
    const insertIndex = headIndex + '<head>'.length;

    // Construct the updated HTML with the new meta tags inserted just after <head> tag
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
  calculatorView: calculatorView,
};
