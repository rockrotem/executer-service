const {describe, it} = require('mocha');
const {expect} = require('chai');
const {executerService} = require('../../../lib/services');
const {ExceuterCommand} = require('../../../lib/models');

describe('executer service negative tests', () => {
  it('should return false in case command not supported', async () => {
    const exceuterCommand = new ExceuterCommand();
    exceuterCommand.command = 'invalid command';
    const result = await executerService.run(exceuterCommand);

    expect(result.code, 'to have http status').to.equal(400);
    expect(result.ok, 'result.ok should equal').to.equal(false);
    expect(result.message, 'message should equal').to.equal(executerService.messageConstants.COMMAND_NOT_SUPPORTED);
  });

  it('should return false in case of null command', async () => {
    const result = await executerService.run(null);

    expect(result.code, 'to have http status').to.equal(402);
    expect(result.ok, 'result.ok should equal').to.equal(false);
    expect(result.message, 'message should equal').to.equal(executerService.messageConstants.COMMAND_NOT_SUPPORTED);
  });
});
