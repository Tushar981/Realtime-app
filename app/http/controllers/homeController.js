const Menu = require('../../models/menu');

function homeController() {
  //implementing factory function

  return {
    async index(req, res) {
      const pizzas = await Menu.find();
      console.log(pizzas);
      return res.render('home', { pizzas: pizzas });
      /*const pizzas = Menu.find.then(function (pizzas) {
        console.log(pizzas);
        return res.render('home', { pizzas: pizzas }); //first one is avilable on the front side of the application and second one is array of object
      });*/
    },
  };
}

module.exports = homeController;
