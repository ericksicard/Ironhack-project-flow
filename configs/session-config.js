const mongoose = require('mongoose');                 // require mongoose
const session = require("express-session");          // require session
const MongoStore = require("connect-mongodb-session")(session);   // require mongostore
const config = require('./config')

// module.exports = app => {
//   app.use(session({
//     secret: config.jwtSecret,                         // reading from .env the SECRET variable
//     //cookie: { maxAge: 60 * 1000 },                    // 60 seconds
//     store: new MongoStore({
//     mongooseConnection: mongoose.connection,
//     resave: true,
//     saveUninitialized: false,
//     ttl: 24 * 60 * 60 // 1 day
//     })
//   }));
// }

module.exports = app => {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60000 },
      store: new MongoStore({
        uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
        collection: 'mySessions'
      })
    })
  );
};