import jQuery from 'jquery';
import EventEmitter from 'events';

export const CLEF_MODE_HORS_LIGNE = 'modeHorsLigne';

export default class BaseRegistre extends EventEmitter {
  constructor ($ = jQuery, urlServeur = process.env.URL_API) {
    super();
    this.$ = $;
    this.urlServeur = urlServeur;
  }

  enregistreModeHorsLigne (estHorsLigne) {
    window.localStorage.setItem(CLEF_MODE_HORS_LIGNE, JSON.stringify(estHorsLigne));
  }

  activeModeHorsLigne (xhr) {
    return this.estModeHorsLigne() && xhr.status === 0;
  }

  estModeHorsLigne () {
    return this.parseLocalStorage(CLEF_MODE_HORS_LIGNE, false);
  }

  parseLocalStorage (clef, defaut = {}) {
    const valeur = window.localStorage.getItem(clef) || JSON.stringify(defaut);
    try {
      return JSON.parse(valeur);
    } catch (ex) {
      return defaut;
    }
  }
}
