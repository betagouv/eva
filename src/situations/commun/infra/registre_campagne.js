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
          try {
            this.enregistreCampagneEnLocale(codeCampagne, campagne);
          } catch {
            reject(new ErreurCampagne(traduction('accueil.erreurs.stockage_plein')));
            return;
          }
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
          } else if (xhr.status === 403 && xhr.responseJSON && xhr.responseJSON.error) {
            reject(new ErreurCampagne(xhr.responseJSON.error));
          } else if (xhr.status === 404) {
            reject(new ErreurCampagne(traduction('accueil.erreurs.code_campagne_inconnu')));
          } else {
            reject(xhr);
          }
        }
      });
    });
  }

  enregistreCampagneEnLocale (codeCampagne, campagne) {
    const cle = this.cleCampagnePourLocalStorage(codeCampagne);
    try {
      this.enregistreEnLocale(cle, campagne);
    } catch (erreur) {
      if (this.estModeHorsLigne()) throw erreur;
      this.supprimeCampagnesEnLocale();
      this.enregistreEnLocale(cle, campagne);
    }
  }

  supprimeCampagnesEnLocale () {
    Object.keys(window.localStorage)
      .filter((cle) => cle.startsWith('campagne_'))
      .forEach((cle) => window.localStorage.removeItem(cle));
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
    if (codeCampagne) return `campagne_${codeCampagne.toUpperCase()}`;
  }

  situation (identifiantSituation) {
    const campagne = this.recupereCampagneCourante();
    return campagne.situations?.find(situation => situation.nom_technique === identifiantSituation);
  }

  questions (identifiantsSituation) {
    if (!Array.isArray(identifiantsSituation)) {
      identifiantsSituation = [identifiantsSituation];
    }
    return identifiantsSituation.reduce((acc, identifiantSituation) => {
      const situation = this.situation(identifiantSituation);
      if (situation && situation.questions) {
        acc.push(...situation.questions);
      }
      return acc;
    }, []);
  }

  questionsEntrainement (identifiantSituation) {
    return this.situation(identifiantSituation).questions_entrainement;
  }
}
