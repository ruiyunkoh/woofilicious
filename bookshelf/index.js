const knex = require('knex')({
    client: 'mysql',
    connection: {
      user: 'foo',
      password:'bar',
      database:'dogfood'
    }
  })
  const bookshelf = require('bookshelf')(knex)
  
  module.exports = bookshelf;
  