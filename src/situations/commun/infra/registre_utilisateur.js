import jQuery from 'jquery';
import EventEmitter from 'events';

const CLEF_SITUATIONS_FAITES = 'situationsFaites';

export const CLEF_IDENTIFIANT = 'identifiantUtilisateur';
export const CHANGEMENT_CONNEXION = 'changementConnexion';

export default class RegistreUtilisateur extends EventEmitter {
  constructor ($ = jQuery, urlServeur = process.env.URL_API, navigateur = navigator) {
    super();
    this.$ = $;
    this.urlServeur = urlServeur;
    this.navigateur = navigateur;
  }

  inscris (nom, codeCampagne) {
    return new Promise((resolve, reject) => {
      if (this.navigateur.onLine) {
        this.$.ajax({
          type: 'POST',
          url: `${this.urlServeur}/api/evaluations`,
          data: JSON.stringify({ nom: nom, code_campagne: codeCampagne }),
          contentType: 'application/json; charset=utf-8',
          success: (data) => {
            const utilisateur = this.enregistreUtilisateurEnLocal(data);
            resolve(utilisateur);
          },
          error: reject
        });
      } else {
        var data = {
          id: `temporaire_${nom}`,
          nom: nom
        };
        const utilisateur = this.enregistreUtilisateurEnLocal(data);
        resolve(utilisateur);
      }
    }).finally(() => {
      window.localStorage.removeItem(CLEF_SITUATIONS_FAITES);
      this.emit(CHANGEMENT_CONNEXION);
    });
  }

  enregistreContact (email, telephone) {
    return new Promise((resolve, reject) => {
      if (this.navigateur.onLine) {
        this.$.ajax({
          type: 'PATCH',
          url: `${this.urlServeur}/api/evaluations/${this.idEvaluation()}`,
          data: JSON.stringify({ email: email, telephone: telephone }),
          contentType: 'application/json; charset=utf-8',
          success: (data) => {
            const utilisateur = this.enregistreUtilisateurEnLocal(data);
            resolve(utilisateur);
          },
          error: reject
        });
      } else {
        const data = this.parseLocalStorage(CLEF_IDENTIFIANT);
        data.email = email;
        data.telephone = telephone;
        const utilisateur = this.enregistreUtilisateurEnLocal(data);
        resolve(utilisateur);
      }
    });
  }

  urlEvaluation (element = '') {
    const urlEvaluation = `${this.urlServeur}/api/evaluations/${this.idEvaluation()}`;
    if (element.length > 0) {
      return `${urlEvaluation}/${element}`;
    } else {
      return `${urlEvaluation}.json`;
    }
  }

  enregistreUtilisateurEnLocal (data) {
    const utilisateur = JSON.stringify(data);
    window.localStorage.setItem(CLEF_IDENTIFIANT, utilisateur);
    return data;
  }

  estConnecte () {
    return !!this.idEvaluation();
  }

  parseLocalStorage (clef) {
    const valeur = window.localStorage.getItem(clef) || '{}';
    try {
      return JSON.parse(valeur);
    } catch (ex) {
      return {};
    }
  }

  nom () {
    return this.parseLocalStorage(CLEF_IDENTIFIANT).nom;
  }

  idEvaluation () {
    return this.parseLocalStorage(CLEF_IDENTIFIANT).id;
  }

  enregistreSituationFaite (situation) {
    const situations = this.situationsFaites();
    if (!situations.includes(situation)) {
      situations.push(situation);
    }
    window.localStorage.setItem(CLEF_SITUATIONS_FAITES, JSON.stringify(situations));
  }

  situationsFaites () {
    const situations = window.localStorage.getItem(CLEF_SITUATIONS_FAITES);
    if (situations) {
      return JSON.parse(situations);
    }
    return [];
  }

  deconnecte () {
    window.localStorage.removeItem(CLEF_IDENTIFIANT);
    window.localStorage.removeItem(CLEF_SITUATIONS_FAITES);
    this.emit(CHANGEMENT_CONNEXION);
  }
}
