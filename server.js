require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const session = require('express-session');

// Database connection
const url = 'mongodb://localhost/Bakery';
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

//set Template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// session config

// app.use(session(){
//   secret:process.env.COOKIE_SECRET,

// })
//Assets
app.use(express.static('public')); // the respnse is come from the server in html format but we want in css format

// import into web.js
require('./routes/web')(app);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
