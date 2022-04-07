const mongoose = require('mongoose');

const schema = mongoose.Schema;

const menuSchema = new schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  size: { type: String, required: true },
});

//creation of module

const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;
