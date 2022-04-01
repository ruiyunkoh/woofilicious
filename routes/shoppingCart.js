const express = require("express");
const { checkIfLogin } = require('../middlewares');
const router = express.Router();

const CartServices = require('../services/cart_services');

router.get('/', checkIfLogin, async(req,res)=>{
  let cart = new CartServices(req.session.user.id);
  res.render('cart/index', {
    'shoppingCart': (await cart.getCart()).toJSON()
    })
});

router.get('/:product_id/add', checkIfLogin, async (req,res)=>{
  let cart = new CartServices(req.session.user.id);
  await cart.addToCart(req.params.product_id, 1);
  req.flash('success_messages', 'Successfully added to cart')
  res.redirect('/products')
});

router.get('/:product_id/remove', checkIfLogin, async(req,res)=>{
  let cart = new CartServices(req.session.user.id);
  await cart.remove(req.params.product_id);
  req.flash("success_messages", "Item has been removed");
  res.redirect('/cart/');
});

router.post('/:product_id/quantity/update', checkIfLogin, async(req,res)=>{
  let cart = new CartServices(req.session.user.id);
  await cart.setQuantity(req.params.product_id, req.body.newQuantity);
  req.flash("success_messages", "Quantity updated")
  res.redirect('/cart/');
});


