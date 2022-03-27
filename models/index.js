const bookshelf = require('../bookshelf')

const Product = bookshelf.model('Product', {
    tableName:'products'
});

const Type = bookshelf.model('Type',{
    tableName: 'types'
});

module.exports = { Product, Type };
