function createSMSing4HotelMixinLib (execlib) {
  'use strict';

  var mylib = {};

  mylib.Service = require('./servicecreator')(execlib);

  return mylib;
}
module.exports = createSMSing4HotelMixinLib;
