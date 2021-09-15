import jQuery from 'jquery';
import RegistreUtilisateur from 'commun/infra/registre_utilisateur';

export default class DepotJournal {
  constructor ($ = jQuery, registreUtilisateur = new RegistreUtilisateur()) {
    this.$ = $;
    this.enregistrements = [];
    this.registreUtilisateur = registreUtilisateur;
  }

  attendFinEnregistrement () {
    return Promise.all(this.enregistrements);
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
            this.enregistreEnLocale(payload);
            resolve(payload);
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
    this.enregistrements.push(promesseDEnregistrement);
    return promesseDEnregistrement;
  }

  enregistreEnLocale (payload) {
    let evenements = this.parseLocalStorage(this.cleEvenementsPourLocalStorage());
    if (Object.keys(evenements).length === 0) { evenements = []; }

    evenements.push(payload);

    const payloadStr = JSON.stringify(evenements);
    window.localStorage.setItem(this.cleEvenementsPourLocalStorage(), payloadStr);
  }

  cleEvenementsPourLocalStorage () {
    return `evenements_${this.registreUtilisateur.idClient()}`;
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
