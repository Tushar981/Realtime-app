const Order = require('../../../models/order');
const moment = require('moment');

function orderController() {
  return {
    store(req, res) {
      //validate request

      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash('error', 'All fields are required ');
        return res.redirect('/cart');
      }

      const order = new Order({
        customerId: req.user._id,
        items: req.session.cart.items,
        phone,
        address,
      });

      order
        .save()
        .then((result) => {
          req.flash('success', 'order placed successfully');
          delete req.session.cart;
          return res.redirect('/customer/order');
        })
        .catch((err) => {
          console.log(err);
          req.flash('Something Went Wong ');
          return res.redirect('/cart');
        });
    },
    async index(req, res) {
      const orders = await Order.find({ customerID: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      res.render('customer/order', { orders: orders, moment: moment });
    },
    async show(req, res) {
      const order = await Order.findById(req.params.id);

      //for authorizing the user
      if (req.user._id.toString() === order.customerId.toString()) {
        return res.render('customer/singleOrder', { order });
      }

      return res.redirect('/');
    },
  };
}

module.exports = orderController;
