function cartController() {
  return {
    index(req, res) {
      res.render('customer/cart');
    },

    update(req, res) {
      // let cart = {
      //   items: {
      //     pizzaID: {
      //       item: pizzaObject,
      //       qty: 0,
      //     },
      //   },
      //   totalQty: 0,
      //   totalprice: 0,
      // };

      //for if the cart is empty and adding basic structure
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }
      //check if  item is  or not if same item is avilable than add it
      let cart = req.session.cart;
      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1,
        };

        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = parseInt(cart.totalPrice) + parseInt(req.body.price);
        console.log('cart.totalQty' + cart.totalQty);
        console.log('cart.totalPrice' + cart.totalPrice);
        console.log('req.body.price' + req.body.price);
      } else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = parseInt(cart.totalPrice) + parseInt(req.body.price);
        console.log('cart.totalQty' + cart.totalQty);
        console.log('cart.totalPrice' + cart.totalPrice);
        console.log('req.body.price' + req.body.price);
      }

      return res.json({ totalQty: req.session.cart.totalQty });
    },
  };
}

module.exports = cartController;

/*
const { json } = require('express');

function cartController() {
  return {
    index(req, res) {
      res.render('customers/cart');
    },
    update(req, res) {
      // let cart = {
      //     items: {
      //         pizzaId: { item: pizzaObject, qty:0 },
      //         pizzaId: { item: pizzaObject, qty:0 },
      //         pizzaId: { item: pizzaObject, qty:0 },
      //     },
      //     totalQty: 0,
      //     totalPrice: 0
      // }
      // for the first time creating cart and adding basic object structure
      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }
      let cart = req.session.cart;

      // Check if item does not exist in cart
      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1,
        };
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      } else {
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
        cart.totalQty = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.price;
      }
      return res.json({ totalQty: req.session.cart.totalQty });
    },
  };
}

module.exports = cartController;
*/
