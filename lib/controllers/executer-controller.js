const {executerService} = require('../services');

function controller(app) {
  app.post('/run/', async (req, res) => {
    let result = {};
    const commandJson = req.body;

    try {
      result = await executerService.run(commandJson);
    } catch (ex) {
      console.error(ex);
    }

    res.status(result.code).send(result);
  });
}
module.exports = {controller};
controller.priority = 1;
