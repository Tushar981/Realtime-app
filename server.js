const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const PORT = process.env.PORT || 3000;

//Assets
app.use(express.static('public')); // the respnse is come from the server in html format but we want in css format
app.get('/', (req, res) => {
  // res.send('Hello World');

  res.render('home');
});

//set Template engine
app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views'));

app.set('view engine', 'ejs');

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
