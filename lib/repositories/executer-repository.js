const cmd = require('node-cmd');
const util = require('util');

const getAsync = util.promisify(cmd.get, {multiArgs: true, context: cmd});

async function run(command) {
  return getAsync(command).then((data) => {
    return Promise.resolve(data);
  }).catch((err) => {
    return Promise.reject(err);
  });
}

module.exports = {
  run,
};
