// Set the default time zone to UTC

process.env.TZ = 'UTC';

const express = require('express');

const dotenv = require('dotenv').config();

const port = process.env.PORT || 5000;

const cron = require('node-cron');

const fs = require('fs');



const db = require('./src/models');

db.sequelize

  .sync({

    alter: true,

  })

  .then(() => {

    console.log(`Synced db`);

  })

  .catch((err) => {

    console.log(`Failed to sync db: ` + err.message);

  });



const app = express();



const fileUpload = require('express-fileupload');

// json fetch

const bodyParser = require('body-parser');

// rest api data in log

const morgan = require('morgan');

const cors = require('cors');



if (process.env.SERVER_LOG_OPEN) {

  // Logging middleware

  function logToFile(message) {

    const timestamp = new Date().toISOString();

    fs.appendFile('console.log', `${timestamp}: ${message}\n`, (err) => {

      if (err) {

        console.error('Error writing to log file:', err);

      }

    });

  }



  function consoleLoggingMiddleware(req, res, next) {

    const originalConsoleLog = console.log;

    console.log = (...args) => {

      originalConsoleLog.apply(console, args);

      logToFile(args.join(' '));

    };

    next();

  }



  app.use(consoleLoggingMiddleware);

}



// CORS

app.use(

  cors({

    origin: '*',

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],

    allowdHeaders:

      'Content-Type, Authorization, Origin, X-Request-With, Accept',

  })

);



app.use(fileUpload());

app.use(morgan('tiny'));

// app.use(express.json());

// app.use(express.urlencoded({extended:false}))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', true);



// public upload

app.use('/uploads', express.static('src/public/uploads'));



const userRouter = require('./src/routes/userRouter');

const calculatorRouter = require('./src/routes/calculatorRouter');

const commentRouter = require('./src/routes/commentRouter');

const likeviewRouter = require('./src/routes/likeviewRouter');

const collectionRouter = require('./src/routes/collectionRouter');

const tagRouter = require('./src/routes/tagRouter');

const sitemapRouter = require('./src/routes/sitemapRouter');

const toolRouter = require('./src/routes/toolRouter');





app.get('/', async function (req, res) {

  return res.status(200).json({

    status: true,

    message: 'Api working',

    userlogin: `http://localhost:${port}/api/user/login`,

  });

});



app.use('/api/user', userRouter);

app.use('/api/calculator', calculatorRouter);

app.use('/api/tool', toolRouter);

app.use('/api/comment', commentRouter);

app.use('/api/like-view', likeviewRouter);

app.use('/api/collection', collectionRouter);

app.use('/api/tag', tagRouter);

app.use('/api/sitemap', sitemapRouter);





const server = app.listen(port, () => {

  console.log(`http://localhost:${port}`);

});

