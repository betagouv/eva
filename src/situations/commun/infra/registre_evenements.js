import jQuery from 'jquery';
import BaseRegistre from 'commun/infra/base_registre';

const DELAI_ENVOI_SYNCHRONE = 15000;

export default class RegistreEvenements extends BaseRegistre {
  constructor (registreUtilisateur, $ = jQuery) {
    super($);
    this.evenementsEnMemoire = [];
    this.registreUtilisateur = registreUtilisateur;
  }

  enregistre (payload) {
    try {
      this.enregistreEvenementEnLocale(payload);
    } catch {
      this.evenementsEnMemoire.push(payload);
    }
    return Promise.resolve();
  }

  envoieEvenements () {
    const idEvaluation = this.registreUtilisateur.idEvaluation();
    if (!idEvaluation) {
      return Promise.resolve();
    }
    const idClient = this.registreUtilisateur.idClient();
    return this.creeEvenements(idClient, idEvaluation, {
      synchrone: true,
      evenementsEnMemoire: this.evenementsEnMemoire
    })
      .then(() => {
        this.evenementsEnMemoire = [];
      })
      .catch((xhr) => {
        if (!this.registreUtilisateur.activeModeHorsLigne(xhr)) {
          throw xhr;
        }
      });
  }

  creeEvenements (idClient, idEvaluation, { synchrone = false, evenementsEnMemoire = [] } = {}) {
    return new Promise((resolve, reject) => {
      const evenements = [...this.evenements(idClient), ...evenementsEnMemoire];

      if (evenements.length === 0) {
        resolve();
        return;
      }

      this.$.ajax({
        type: 'POST',
        url: `${this.urlServeur}/api/evaluations/${idEvaluation}/collections_evenements`,
        data: JSON.stringify(synchrone ? { evenements, synchrone } : { evenements }),
        contentType: 'application/json; charset=utf-8',
        timeout: synchrone ? DELAI_ENVOI_SYNCHRONE : undefined,
        success: () => {
          this.supprimeDuLocalStorage(idClient);
          resolve();
        },
        error: reject
      });
    });
  }

  enregistreEvenementEnLocale (payload) {
    const idClient = this.registreUtilisateur.idClient();
    const evenements = this.evenements(idClient);
    evenements.push(payload);
    this.enregistreEnLocale(this.clePourLocalStorage(idClient), evenements);
  }

  evenements (idClient) {
    const cle = this.clePourLocalStorage(idClient);
    return this.parseLocalStorage(cle, []);
  }

  clePourLocalStorage (idClient) {
    return `evenements_${idClient}`;
  }
}
