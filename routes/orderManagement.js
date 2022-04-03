const express = require("express");
const {
  checkIfAuthenticated
} = require('../middlewares');
const router = express.Router();
const moment = require('moment-timezone');

const {
  getAllOrders,
  getOrderByStatus,
  getOrderByCreatedDate,
  getOrderById,
  updateStatus,
  ORDER_STATUS,
  MONTH
} = require('../dal/orders');

router.get('/', checkIfAuthenticated, async (req, res) => {
  const statusFilter = req.query?.status;
  const monthFilter = req.query?.month;
  let orders, activeFilter, activeFilterType;

  if (statusFilter) {
    orders = (await getOrderByStatus(statusFilter)).toJSON();
    activeFilter = statusFilter;
    activeFilterType = 'status';
  } else if (monthFilter) {
    const month = MONTH[monthFilter];
    const minDate = moment.tz([2022, month - 1], 'Asia/Singapore').toDate();
    const maxDate = moment.tz(minDate, 'Asia/Singapore').endOf('month').toDate();
    orders = (await getOrderByCreatedDate(minDate, maxDate)).toJSON();
    activeFilter = monthFilter;
    activeFilterType = 'month';
  } else {
    orders = (await getAllOrders()).toJSON();
  }

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
    'orders': formattedOrders,
    'statuses': Object.values(ORDER_STATUS),
    'months': Object.keys(MONTH),
    'activeFilter': activeFilter,
    'activeFilterType': activeFilterType
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