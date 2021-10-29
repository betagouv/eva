import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  enabled: !!process.env.JETON_CLIENT_ROLLBAR,
  accessToken: process.env.JETON_CLIENT_ROLLBAR,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.ROLLBAR_ENV || process.env.NODE_ENV
  },
  client: {
    javascript: {
      source_map_enabled: true,
      code_version: process.env.SOURCE_VERSION,
      guess_uncaught_frames: true
    }
  }
});

export function erreur (...args) {
  rollbar.error(...args);
}

function formatComponentName (vm) {
  if (vm.$root === vm) {
    return 'root instance';
  }
  const name = vm._isVue
    ? vm.$options.name || vm.$options._componentTag
    : vm.name;
  return (name ? 'component <' + name + '>' : 'anonymous component') +
    (vm._isVue && vm.$options.__file ? ' at ' + vm.$options.__file : '');
}

export function erreurVue (err, vm, info) {
  erreur(`Erreur vue.js dans la méthode ${info}`, err, {
    componentName: formatComponentName(vm),
    propsData: vm.$options.propsData
  });
}
