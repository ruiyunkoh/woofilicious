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

const MONTH = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12
}

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
      withRelated: ['user', 'orderItems', 'orderItems.product']
    });
};

const getOrderByCreatedDate = async (minDate, maxDate) => {
  return await Order.collection()
    .query(function(qb) {
      qb.whereBetween('created_at', [minDate, maxDate]);
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

  await Promise.all(cartItems.map((item) => {
    createOrderItems(orderId, item.productId, item.quantity);
  }));

  return order;
};

// update status of order

function updateStatus(orderId, newStatus) {
  return Order.where({
    'id': orderId
  }).save({
    'status': newStatus
  }, {
    method: 'update',
    require: true
  }).then((resolve) => {
    return true
  }, (err) => {
    // Catch the error with Model that returns this even though update was successful
    if (err.message == 'EmptyResponse') {
      return true;
    }
    return false;
  });
}


module.exports = {
  ORDER_STATUS,
  MONTH,
  getAllOrders,
  getOrderById,
  getOrderByCreatedDate,
  getOrderByStatus,
  createOrderAndOrderItems,
  updateStatus
}