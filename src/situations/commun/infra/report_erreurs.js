import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: process.env.JETON_CLIENT_ROLLBAR,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.NODE_ENV
  }
});

export function erreur (...args) {
  rollbar.error(...args);
}
