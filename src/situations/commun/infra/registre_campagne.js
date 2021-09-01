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
            const localCampagne = this.recupereCampagneEnLocale(codeCampagne);
            if (Object.keys(localCampagne).length > 0) {
              resolve(localCampagne);
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

  assigneCampagneCourante (codeCampagne) {
    window.localStorage.setItem('campagneCourante', codeCampagne);
  }

  recupereCampagneCourante () {
    const codeCampagne = window.localStorage.getItem('campagneCourante');
    return this.recupereCampagneEnLocale(codeCampagne);
  }

  recupereCampagneEnLocale (codeCampagne) {
    return this.parseLocalStorage(this.cleCampagnePourLocalStorage(codeCampagne));
  }

  cleCampagnePourLocalStorage (codeCampagne) {
    return `campagne_${codeCampagne}`;
  }

  situation (identifiantSituation) {
    const campagne = this.recupereCampagneCourante();
    return campagne.situations.find(situation => situation.nom_technique === identifiantSituation);
  }

  questions (identifiantSituation) {
    const situation = this.situation(identifiantSituation);
    if (situation.questions) {
      return situation.questions;
    } else {
      return this.recupereCampagneCourante().questions;
    }
  }

  questionsEntrainement (identifiantSituation) {
    return this.situation(identifiantSituation).questions_entrainement;
  }
}
