const express = require("express");
const {
  checkIfAuthenticated
} = require('../middlewares');
const router = express.Router();

const {
  getAllOrders,
  getOrderByStatus,
  getOrderById,
  updateStatus,
} = require('../dal/orders');

router.get('/', checkIfAuthenticated, async (req, res) => {
  const orders = (await getAllOrders()).toJSON();
  const formattedOrders = orders.map((order) => ({
    ...order,
    createdAt: order.created_at.toLocaleString('en-GB', {
      timeZone: 'Asia/Singapore'
    }),
    updatedAt: order.updated_at.toLocaleString('en-GB', {
      timeZone: 'Asia/Singapore'
    }),
    numOrderItems: order.orderItems.length
  }))

  res.render('orderManagement/orders', {
    'orders': formattedOrders
  });
});

router.post('/:order_id/status/update', checkIfAuthenticated, async (req, res) => {
  await updateStatus(req.params.order_id, req.body.newStatus);
  req.flash("success_messages", "Status updated")
  res.redirect('/orders/');
});

router.get('/:order_id', checkIfAuthenticated, async (req, res) => {
  const orders = (await getOrderById(req.params.order_id)).toJSON();
  
  if (orders.length === 1) {
    const order = orders[0];
    const formattedOrder = {
      ...order,
      createdAt: order.created_at.toLocaleString('en-GB', {
        timeZone: 'Asia/Singapore'
      }),
      updatedAt: order.updated_at.toLocaleString('en-GB', {
        timeZone: 'Asia/Singapore'
      }),
      numOrderItems: order.orderItems.length
    };

    const formattedItems = formattedOrder.orderItems.map((item) => ({
      ...item,
      totalCost: item.product.cost * item.quantity,
      unitCost: item.product.cost,
      name: item.product.name
    }));

    res.render('orderManagement/items', {
      'order': formattedOrder,
      'items': formattedItems
    });
  }
});

module.exports = router;