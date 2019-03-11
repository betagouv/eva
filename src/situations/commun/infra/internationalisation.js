import i18next from 'i18next';
import locales from '../../../locales/fr.json';

export function initialise () {
  return i18next.init({
    lng: 'fr',
    debug: process.NODE_ENV !== 'production',
    resources: {
      fr: {
        translation: locales
      }
    }
  });
}

export function traduit (...args) {
  return i18next.t(...args);
}
