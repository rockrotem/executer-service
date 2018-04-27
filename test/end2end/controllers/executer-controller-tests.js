'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const {describe, before, it} = require('mocha');
const {ExceuterCommand} = require('../../../lib/models');

chai.use(chaiHttp);
const {expect} = chai;
let app;

describe('executer controller tests', () => {
  before(async () => {
    const {bootstrap} = require('../../../app');
    app = bootstrap.getApp();
  });

  it('should run a valid command: "pwd" with no args success', async () => {
    const exceuterCommand = new ExceuterCommand();
    exceuterCommand.command = 'pwd';

    let res;
    try {
      res = await chai.request(app).post('/run/').send(exceuterCommand);
    } catch (ex) {
      expect(ex, 'to not have exception').to.equal(null);
    }

    const result = res.body;
    expect(res, 'to have http status').to.have.status(200);
    expect(result.ok, 'result.ok should equal').to.equal(true);
    expect(result.data, 'data of pwd command should equal').to.equal(process.cwd() + '\n');
  });

  it('should run a valid command: "echo 1 2 3" with args success', async () => {
    const exceuterCommand = new ExceuterCommand();
    exceuterCommand.command = 'echo';
    exceuterCommand.args = [1, 2, 3];

    let res;
    try {
      res = await chai.request(app).post('/run/').send(exceuterCommand);
    } catch (ex) {
      console.error(ex);
      expect(ex, 'to not have exception').to.equal(null);
    }

    const result = res.body;
    expect(res, 'to have http status').to.have.status(200);
    expect(result.ok, 'result.ok should equal').to.equal(true);
    expect(result.data, 'data of echo command should equal').to.equal('1 2 3\n');
  });
});
