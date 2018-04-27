const executerRepository = require('../repositories/executer-repository');
const {ServiceResult} = require('../models');
const messageConstants = {
  COMMAND_NOT_SUPPORTED: 'command not supported',
};

const commandsWhiteLists = ['pwd', 'grep', 'echo'];

async function run(commandJson) {
  const serviceResult = new ServiceResult();
  if (!validateCommand(commandJson)) {
    serviceResult.ok = false;
    serviceResult.code = commandJson ? 400 : 402;
    serviceResult.message = 'command not supported';
    serviceResult.errors = commandJson ? [`command: '${commandJson.command}' is not supported`] : ['null command is not supported'];
    return serviceResult;
  }

  const command = formatCommand(commandJson);

  try {
    let result = await executerRepository.run(command);
    serviceResult.ok = true;
    serviceResult.code = 200;
    serviceResult.message = 'command was successfully executed... hooray!!!';
    serviceResult.data = result;
    return serviceResult;
  } catch (ex) {
    serviceResult.ok = false;
    serviceResult.code = 500;
    serviceResult.message = 'command execution was failed!! :-(';
    serviceResult.hasException = true;
    serviceResult.exception = process.env.NODE_ENV !== 'production' ? ex : null;
  }

  return serviceResult;
}

function validateCommand(commandJson) {
  return commandJson && commandsWhiteLists.includes(commandJson.command);
}

function formatCommand(commandJson) {
  const args = commandJson.args ? commandJson.args.join(' ') : '';
  const command = commandJson.command;

  return `${command} ${args}`;
}

module.exports = {
  run,
  messageConstants,
};
