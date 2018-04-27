'use strict';

const express = require('express');
const fs = require('fs');
const {sortBy} = require('lodash');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

/**
 * Responsible to scan the controllers directory and include all available Javascript files
 * These files should expose a controller method on it's module.exports object.
 * @param controllersDir
 */
function gatherControllers(controllersDir) {
  let routesArray = [];

  // dynamically include routes (Controller)
  fs.readdirSync(controllersDir).forEach((file) => {
    if (file.substr(-3) === '.js') {
      const route = require(`${controllersDir}/${file}`);

      if (typeof route.controller !== 'function') {
        throw new Error(`No controller method defined on the exposed object for: ${controllersDir}/${file}`);
      }

      routesArray.push(route);
    }
  });

  // sort controllers by priority.
  routesArray = sortBy(routesArray, (controllerRepo) => {
    return controllerRepo.controller.priority;
  });
  // create router of each controller.
  routesArray.forEach((route) => {
    /* eslint new-cap: 0 */
    const router = express.Router();
    const optionalRoutingNamespace = Object.prototype.hasOwnProperty.call(route.controller, 'route') ? route.controller.route : '';
    app.use(optionalRoutingNamespace, router);
    route.controller(router);
  });
}

/**
 * Public methods of the Bootstrap class
 */

function getApp() {
  return app;
}

function run(controllersDir) {
  app.use(bodyParser.json({type: 'application/json'}));
  gatherControllers(controllersDir);

  const server = http.createServer(app);
  server.on('error', (e) => {
    console.error('listen failed for port 6000', e);
  });

  server.listen(6000);
}

module.exports = {
  run,
  getApp,
};
