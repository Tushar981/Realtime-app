const Menu = require('../../models/menu');

function homeController() {
  //implementing factory function

  return {
    index(req, res) {
      const pizzas = Menu.find();
      return res.render('home', { pizzas: pizzas });
    },
  };
}

module.exports = homeController;
