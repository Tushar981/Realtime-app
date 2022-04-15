const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customer/cartController');
const orderController = require('../app/http/controllers/customer/orderController');

const adminOrderController = require('../app/http/controllers/admin/orderController');
const StatusController = require('../app/http/controllers/admin/statusController');
//middleware

const guest = require('../app/http/middleware/guest');
const auth = require('../app/http/middleware/auth');
const admin = require('../app/http/middleware/admin');

function initRoutes(app) {
  app.get('/', homeController().index);

  app.get('/login', guest, authController().login);
  app.post('/login', authController().postLogin);

  app.get('/register', guest, authController().register);
  app.post('/register', authController().postRegister);

  app.post('/logout', authController().logout);

  app.get('/cart', cartController().index);

  app.post('/update-cart', cartController().update);

  // fro customer routes
  app.post('/orders', auth, orderController().store);
  app.get('/customer/order', auth, orderController().index);
  app.get('/customer/order/:id', auth, orderController().show);

  // for admin
  app.get('/admin/orders', admin, adminOrderController().index);
  app.post('/admin/orders/status', admin, StatusController().update);
}

module.exports = initRoutes;
