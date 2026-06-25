// Set the default time zone to UTC
process.env.TZ = 'UTC';
const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3000;
const fs = require('fs');

const app = express();
const sitemapRouter = require('./routes/sitemapRouter');
const ssrCalculatorRouter = require('./routes/ssrCalculatorRouter');
const ssrHomeRouter = require('./routes/ssrHomeRouter');
const ssrCollectionsRouter = require('./routes/ssrCollectionsRouter');
const ssrCollectionRouter = require('./routes/ssrCollectionRouter');




// CORS
app.use(
  cors({
    origin: '*',
    methods: ['GET','POST','PUT','DELETE','PATCH'],
    allowdHeaders:
    'Content-Type, Authorization, Origin, X-Request-With, Accept',
  })
);



app.use('/sitemap', sitemapRouter);
app.use('/calculator', ssrCalculatorRouter);
app.use('/', ssrHomeRouter);
app.use('/collections', ssrCollectionsRouter);
app.use('/collection', ssrCollectionRouter);


// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, process.env.BUILD_PATH)));

// Define route to serve the React application
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, process.env.BUILD_PATH, 'index.html'));
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
