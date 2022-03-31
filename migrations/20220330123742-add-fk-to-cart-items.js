'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.addForeignKey('cart_items', 'products', 'cart_items_product_fk', {
    'product_id': 'id'
  }, {
    'onDelete': 'CASCADE',
    'onUpdate': 'RESTRICT'
  });
};

exports.down = function (db, callback) {
  db.removeForeignKey('cart_items', 'cart_items_product_fk', callback);
};

exports._meta = {
  "version": 1
};