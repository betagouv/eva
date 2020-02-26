import i18next from 'i18next';
import locales from '../../../locales/fr.json';

export function format (value, format) {
  if (format === 'duree') {
    const nombreMinutes = Math.trunc(value / (60 * 1000));
    const minutes = traduction('minute', { count: nombreMinutes });
    const secondes = traduction('seconde', { count: Math.trunc(value / 1000 - nombreMinutes * 60) });
    return traduction('duree', { minutes, secondes });
  }
  return value;
}

export function initialise () {
  return i18next.init({
    lng: 'fr',
    debug: process.env.NODE_ENV === 'development',
    resources: {
      fr: {
        translation: locales
      }
    },
    interpolation: { format }
  });
}

export function traduction (...args) {
  return i18next.t(...args);
}
