import jQuery from 'jquery';
import BaseRegistre from 'commun/infra/base_registre';

export default class RegistreEvenements extends BaseRegistre {
  constructor (registreUtilisateur, $ = jQuery) {
    super($);
    this.promesses = [];
    this.registreUtilisateur = registreUtilisateur;
  }

  attendFinEnregistrement () {
    return Promise.all(this.promesses);
  }

  enregistre (payload, timeout = 60000) {
    let delay = 100;
    const datePremierAppel = Date.now();
    const promesseDEnregistrement = new Promise((resolve, reject) => {
      const settingsAjax = {
        type: 'POST',
        url: `${process.env.URL_API}/api/evenements`,
        data: JSON.stringify(payload),
        contentType: 'application/json; charset=utf-8',
        success: resolve,
        error: (xhr) => {
          if (this.registreUtilisateur.activeModeHorsLigne(xhr)) {
            this.enregistreEvenementEnLocale(payload);
            resolve();
          } else {
            if (Date.now() - datePremierAppel < timeout) {
              setTimeout(() => {
                delay = Math.min(delay * 2, 2000);
                this.$.ajax(settingsAjax);
              }, delay);
            } else {
              reject(xhr);
            }
          }
        }
      };
      this.$.ajax(settingsAjax);
    });
    this.promesses.push(promesseDEnregistrement);
    return promesseDEnregistrement;
  }

  enregistreEvenementEnLocale (payload) {
    const idClient = this.registreUtilisateur.idClient();
    const evenements = this.parseLocalStorage(this.cleEvenementsPourLocalStorage(idClient), []);
    evenements.push(payload);
    this.enregistreEnLocale(this.cleEvenementsPourLocalStorage(idClient), evenements);
  }

  cleEvenementsPourLocalStorage (idClient) {
    return `evenements_${idClient}`;
  }
}
