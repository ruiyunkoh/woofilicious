const {
  CartItem
} = require('../models');

const getCart = async (userId) => {
  return await CartItem.collection()
    .where({
      'user_id': userId
    }).fetch({
      require: false,
      withRelated: ['product', 'product.type']
    });
};

const getCartItemByUserAndProduct = async (userId, productId) => {
  return await CartItem.where({
    'user_id': userId,
    'product_id': productId
  }).fetch({
    require: false,
    // withRelated: ['product', 'product.type']
  });
};

// add item to cart

async function createCartItem(userId, productId, quantity) {
  let cartItem = new CartItem({
    'user_id': userId,
    'product_id': productId,
    'quantity': quantity
  })
  await cartItem.save();
  return cartItem;
};

// remove item from cart

async function removeFromCart(userId, productId) {
  let cartItem = await getCartItemByUserAndProduct(userId, productId);
  if (cartItem) {
    await cartItem.destroy();
    // console.log(`Deleted item ${productId} for user ${userId}`)
    return true;
  }
  return false;
};

// update quantity of cart item

async function updateQuantity(userId, productId, newQuantity) {
  let cartItem = await getCartItemByUserAndProduct(userId, productId);
  if (cartItem) {
    cartItem.set('quantity', newQuantity);
    cartItem.save();
    return true;
  }
  return false;
}


module.exports = {
  getCart,
  getCartItemByUserAndProduct,
  createCartItem,
  removeFromCart,
  updateQuantity
}