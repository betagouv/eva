import BaseRegistre from 'commun/infra/base_registre';
import ErreurCampagne from 'commun/infra/erreur_campagne';
import { traduction } from 'commun/infra/internationalisation';

export default class RegistreCampagne extends BaseRegistre {
  recupereCampagne (codeCampagne) {
    return new Promise((resolve, reject) => {
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
          if (this.activeModeHorsLigne(xhr)) {
            const localCampagne = window.localStorage.getItem(this.cleCampagnePourLocalStorage(codeCampagne));
            if (localCampagne) {
              resolve(JSON.parse(localCampagne));
            } else {
              reject(new ErreurCampagne(traduction('accueil.erreurs.code_campagne_inconnu')));
            }
          } else {
            if (xhr.status === 404) {
              reject(new ErreurCampagne(traduction('accueil.erreurs.code_campagne_inconnu')));
            } else {
              reject(xhr);
            }
          }
        }
      });
    });
  }

  cleCampagnePourLocalStorage (codeCampagne) {
    return `campagne_${codeCampagne}`;
  }
}
