require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const passport = require('passport');




// Set up the database
require('./configs/db-config');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));


// hbs as view engine

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'Flow, MERN stack social media platform';
app.use((req, res, next) => {
  // here I will set a local variable for the body class. This is just another way that you can use local variables and for our purposes we will be doing this in order to track when we are in message boards details page
  //res.locals.bodyClass = "default";

  // thanks to passport we have access to req.session.user to get the current users information. By using res.locals to set the variable currentUser we can now call currentUser from any of our view pages since we are declaring it in the app.js
  // normally setting res.locals variable in a route will only give you access to that variable in the view page that you are rendering.
  res.locals.currentUser = req.user;

  // after we have finished what needs to be done in this section we call next so that we continue onto the next process that must be ran.
  // ** forgetting to add a next() here can make your app hang and you may not get any error messages letting your know why it is hanging. If you see  GET / - - ms - -  in your terminal then that will more than likely mean that you forgot to add a next here.
  next();
});


const index = require('./routes/index');
const user = require('./routes/user-routes');

app.use('/', index);

app.use('/', user);
app.use('/', require('./routes/auth-routes'))
app.use('/', require('./routes/post-routes'));


app.use('/api', user);



module.exports = app;
