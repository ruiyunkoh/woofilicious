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
  return db.addForeignKey('order_items', 'orders', 'order_items_order_fk', {
    'order_id': 'id'
  }, {
    'onDelete': 'CASCADE',
    'onUpdate': 'RESTRICT'
  });
};

exports.down = function (db, callback) {
  return db.removeForeignKey('order_items', 'order_items_order_fk', callback);
};

exports._meta = {
  "version": 1
};