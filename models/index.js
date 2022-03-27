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


module.exports = {
  Product,
  Type,
  Size
};