const mongoose    = require('mongoose');                 // require mongoose
const session     = require("express-session");          // require session
const MongoStore  = require("connect-mongo")(session);   // require mongostore
const config      = require('./config')

module.exports = app => {
  app.use(session({
    secret: config.jwtSecret,                         // reading from .env the SECRET variable
    //cookie: { maxAge: 60 * 1000 },                    // 60 seconds
    store: new MongoStore({
    mongooseConnection: mongoose.connection,
    resave: true,
    saveUninitialized: false,
    ttl: 24 * 60 * 60 // 1 day
    })
  }));
}