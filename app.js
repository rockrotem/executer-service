'use strict';

const path = require('path');
const bootstrap = require('./bootstrap');

const controllersDir = path.join(__dirname, '/lib/controllers');

bootstrap.run(controllersDir);

process.on('uncaughtException', function(err) {
  console.log(err);
});

module.exports = {
  bootstrap,
};
