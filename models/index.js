const bookshelf = require('../bookshelf')

const Product = bookshelf.model('Product', {
  tableName: 'products',
  type() {
    return this.belongsTo('Type')
  },
  sizes() {
    return this.belongsToMany('Size');
  }
});

const Type = bookshelf.model('Type', {
  tableName: 'types',
  products() {
    return this.hasMany('Product');
  }
});

const Size = bookshelf.model('Size', {
  tableName: 'sizes',
  products() {
    return this.belongsToMany('Product')
  }
});

const User = bookshelf.model('User', {
  tableName: 'users',
  cartItems() {
    return this.hasMany('CartItem');
  },
  orders() {
    return this.hasMany('Order');
  }
});

const CartItem = bookshelf.model('CartItem', {
  tableName: 'cart_items',
  product() {
    return this.belongsTo('Product')
  }
});

const Order = bookshelf.model('Order', {
  tableName: 'orders',
  hasTimestamps: true,
  user() {
    return this.belongsTo('User')
  },
  orderItems() {
    return this.hasMany('OrderItem');
  }
});

const OrderItem = bookshelf.model('OrderItem', {
  tableName: 'order_items',
  order() {
    return this.belongsTo('Order', 'order_id')
  },
  product() {
    return this.belongsTo('Product')
  }
});


module.exports = {
  Product,
  Type,
  Size,
  User,
  CartItem,
  Order,
  OrderItem
};