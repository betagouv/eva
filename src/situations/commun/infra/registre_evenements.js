import jQuery from 'jquery';
import BaseRegistre from 'commun/infra/base_registre';

export default class RegistreEvenements extends BaseRegistre {
  constructor (registreUtilisateur, $ = jQuery) {
    super($);
    this.promesses = [];
    this.evenementsEnEchec = [];
    this.evenementsEnMemoire = [];
    this.registreUtilisateur = registreUtilisateur;
  }

  attendFinEnregistrement () {
    return Promise.allSettled(this.promesses).then(() => {
      if (this.evenementsEnEchec.length > 0) {
        throw new Error(`${this.evenementsEnEchec.length} événement(s) non enregistré(s)`);
      }
    });
  }

  relanceEnregistrementsEnEchec (timeout) {
    const evenements = this.evenementsEnEchec;
    this.evenementsEnEchec = [];
    this.promesses = [];
    evenements.forEach((payload) => this.enregistre(payload, timeout).catch(() => {}));
    return this.attendFinEnregistrement();
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
