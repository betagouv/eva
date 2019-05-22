import i18next from 'i18next';

export function initialise (translation = {}) {
  return i18next.init({
    lng: 'fr',
    resources: {
      fr: { translation }
    }
  });
}
