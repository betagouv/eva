import jQuery from 'jquery';
import EventEmitter from 'events';
import ErreurCampagne from 'commun/infra/erreur_campagne';

export default class RegistreCampagne extends EventEmitter {
  constructor ($ = jQuery, urlServeur = process.env.URL_API, navigateur = navigator) {
    super();
    this.$ = $;
    this.urlServeur = urlServeur;
    this.navigateur = navigateur;
  }

  recupereCampagne (codeCampagne) {
    return new Promise((resolve, reject) => {
      if (this.navigateur.onLine) {
        this.$.ajax({
          type: 'GET',
          url: `${this.urlServeur}/api/campagnes/${encodeURI(codeCampagne)}`,
          contentType: 'application/json; charset=utf-8',
          success: (campagne) => {
            const campagneStr = JSON.stringify(campagne);
            window.localStorage.setItem(this.cleCampagnePourLocalStorage(codeCampagne), campagneStr);
            resolve(campagne);
          },
          error: (xhr) => {
            if (xhr.status === 404) {
              resolve(new ErreurCampagne('Code inconnu'));
            } else {
              reject(xhr);
            }
          }
        });
      } else {
        const localCampagne = window.localStorage[this.cleCampagnePourLocalStorage(codeCampagne)];
        if (localCampagne) {
          resolve(JSON.parse(localCampagne));
        } else {
          reject(new ErreurCampagne('Code campagne inconnu ou erreur réseau'));
        }
      }
    });
  }

  cleCampagnePourLocalStorage (codeCampagne) {
    return `campagne_${codeCampagne}`;
  }
}
