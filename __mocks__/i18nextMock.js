module.exports = {
  init: () => {},
  exists: () => { return false; },
  t: (key, args) => {
    const params = args ? JSON.stringify(args) : '';
    return key + params;
  }
};
