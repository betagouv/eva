import jQuery from 'jquery';
import EventEmitter from 'events';

const CLEF_SITUATIONS_FAITES = 'situationsFaites';

export const CLEF_IDENTIFIANT = 'identifiantUtilisateur';
export const CHANGEMENT_CONNEXION = 'changementConnexion';

export default class RegistreUtilisateur extends EventEmitter {
  constructor ($ = jQuery) {
    super();
    this.$ = $;
  }

  inscris (nom, codeCampagne) {
    return new Promise((resolve, reject) => {
      this.$.ajax({
        type: 'POST',
        url: `${process.env.URL_SERVEUR}/api/evaluations`,
        data: JSON.stringify({ nom: nom, code_campagne: codeCampagne }),
        contentType: 'application/json; charset=utf-8',
        success: resolve,
        error: reject
      });
    }).then((data) => {
      window.localStorage.setItem(CLEF_IDENTIFIANT, JSON.stringify(data));
      window.localStorage.removeItem(CLEF_SITUATIONS_FAITES);
      this.emit(CHANGEMENT_CONNEXION);
    });
  }

  urlEvaluation () {
    return `${process.env.URL_SERVEUR}/api/evaluations/${this.idEvaluation()}.json`;
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
