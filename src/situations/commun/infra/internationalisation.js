import i18next from 'i18next';
import locales from '../../../locales/fr.json';

export function initialise () {
  return i18next.init({
    lng: 'fr',
    debug: process.env.NODE_ENV !== 'development',
    resources: {
      fr: {
        translation: locales
      }
    }
  });
}

export function traduction (...args) {
  return i18next.t(...args);
}
