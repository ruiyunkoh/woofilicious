const bookshelf = require('../bookshelf')

const Product = bookshelf.model('Product', {
  tableName: 'products',
  type() {
    return this.belongsTo('Type')
  }

});

const Type = bookshelf.model('Type', {
  tableName: 'types',
  products() {
    return this.hasMany('Product');
  }

});

module.exports = {
  Product,
  Type
};