require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const MongoDBStore = require('connect-mongo');
const passport = require('passport');
//const passport = new (require('passport').Strategy)();
const flash = require('express-flash');
const { urlencoded } = require('express');
// The express-flash module exposes getter and setter methods sets the value of a new flash message and adds it to an array of messages of the same type.

// Database connection
const url = process.env.MONGO_CONNECTION_URL;
mongoose.connect(url, {
  useNewUrlParser: true,
});
mongoose.connection
  .once('open', () => {
    console.log('Database connected...');
  })
  .on('error', (error) => {
    console.log('Connection failed...');
  });

// session Store

// let mongoStore = new MongoDBStore({
//   mongooseConnection: connection,
//   collection: 'session',
// });

// session config

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDBStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_URL,
    }),
    saveUninitialized: false,
    cookies: { maxage: 1000 * 60 * 60 },
  })
);

//passport config
const passportInit = require('./app/config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
//Assets
app.use(express.static('public')); // the respnse is come from the server in html format but we want in css format

// Global Middleware

// used for the session at the update the cart value the session is not directly avilable thats why we call the global middleware and its a anonymous function

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user; //logged in user will be avilable in front side
  next();
});

//set Template engine
app.use(expressLayout);
app.use(express.json()); // we used this to enable use of json formatting for the data we fatch
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// import into web.js
require('./routes/web')(app);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
