const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'customer' },
  },
  {
    timestamps: true,
  }
);

//creation of module

const Menu = mongoose.model('User', userSchema);
module.exports = Menu;
