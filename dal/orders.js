const {
  Order
} = require('../models');

const {
  createOrderItems
} = require('./order_items');

const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  COMPLETED: 'completed'
};

const getAllOrders = async () => {
  return await Order.collection()
    .where({})
    .fetch({
      require: false,
      withRelated: ['user', 'orderItems']
    })
}

const getOrderById = async (orderId) => {
  return await Order.collection()
    .where({
      'id': orderId
    }).fetch({
      require: false,
      withRelated: ['user', 'orderItems']
    });
};

const getOrderByUser = async (userId) => {
  return await Order.collection()
    .where({
      'user_id': userId
    }).fetch({
      require: false,
      withRelated: ['user', 'orderItems']
    });
};

const getOrderByStatus = async (status) => {
  return await Order.collection()
    .where({
      'status': status
    }).fetch({
      require: false,
      withRelated: ['user', 'orderItems']
    });
};

// create order

async function createOrderAndOrderItems(userId, cartItems) {
  let order = new Order({
    'user_id': userId,
    'status': ORDER_STATUS.PAID
  });

  await order.save();

  const orderId = order.get('id');
  // console.log('created orderId', orderId);

  await Promise.all(cartItems.map((item) => {
    createOrderItems(orderId, item.productId, item.quantity);
    // console.log('created order item: productId', item.productId, 'quantity', item.quantity);
  }));

  return order;
};

// update status of order

async function updateStatus(orderId, newStatus) {
  let order = await getOrderById(orderId);

  if (order) {
    order.save({
      'status': newStatus
    }, {
      method: 'update'
    });
    return true;
  }

  return false;
}


module.exports = {
  getAllOrders,
  getOrderById,
  getOrderByUser,
  getOrderByStatus,
  createOrderAndOrderItems,
  updateStatus
}