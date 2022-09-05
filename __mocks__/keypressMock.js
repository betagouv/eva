const configuration = {};
module.exports = {
  useKeypress: (config) => {
    configuration[config.keyEvent] = config.keyBinds;
  },
  keyConfiguration: configuration
};
