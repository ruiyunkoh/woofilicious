const {
  OrderItem
} = require('../models');

const getOrderItemsByOrderId = async (orderId) => {
  return await OrderItem.where({
    'order_id': orderId
  }).fetch({
    require: false,
    withRelated: ['product', 'product.type']
  });
};

// add item to order

async function createOrderItems(orderId, productId, quantity) {
  let orderItem = new OrderItem({
    'order_id': orderId,
    'product_id': productId,
    'quantity': quantity
  })
  await orderItem.save();
  return orderItem;
};

module.exports = {
  getOrderItemsByOrderId,
  createOrderItems
}