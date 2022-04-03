const express = require('express');
const {
  getCart,
  removeFromCart
} = require('../dal/cart_items');
const {
  createOrderAndOrderItems
} = require('../dal/orders');
const router = express.Router();

const CartServices = require('../services/cart_services')
const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.get('/', async (req, res) => {
  const cart = new CartServices(req.session.user.id);

  let items = await cart.getCart();

  let lineItems = [];
  let meta = [];
  for (let item of items) {
    const lineItem = {
      'name': item.related('product').get('name'),
      'amount': item.related('product').get('cost') * 100,
      'quantity': item.get('quantity'),
      'currency': 'SGD'
    }
    // if (item.related('product').get('image_url')) {
    //     lineItem['images'] = [item.related('product').get('image_url')]
    // }
    lineItems.push(lineItem);
    meta.push({
      'product_id': item.get('product_id'),
      'quantity': item.get('quantity')
    })
  }

  let metaData = JSON.stringify(meta);
  const payment = {
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url: process.env.STRIPE_SUCCESS_URL + '{CHECKOUT_SESSION_ID}',
    cancel_url: process.env.STRIPE_ERROR_URL,
    metadata: {
      'orders': metaData
    }
  }

  let stripeSession = await Stripe.checkout.sessions.create(payment)
  res.render('checkout/checkout', {
    'sessionId': stripeSession.id,
    'publishableKey': process.env.STRIPE_PUBLISHABLE_KEY
  })
});

router.get('/success/:sessionId', async (req, res) => {
  // Convert cart_items for this session to order + order_items
  const userId = req.session.user.id;
  const cartItems = await getCart(userId);

  if (cartItems.length > 0) {
    const formattedCartItems = cartItems.map((item) => {
      return {
        'productId': item.get('product_id'),
        'quantity': item.get('quantity')
      }
    });
    // console.log(formattedCartItems);

    // Create order for user + 1 order_item per cart_item
    await createOrderAndOrderItems(userId, formattedCartItems);

    // Delete cart_items from user's cart
    await Promise.all(formattedCartItems.map((item) => {
      removeFromCart(userId, item.productId);
    }));
  }

  res.render('checkout/success')
});

router.get('/cancel', function (req, res) {
  res.render('checkout/cancel')
});


module.exports = router;