import EventEmitter from 'events';
import jQuery from 'jquery';

import Progression from 'commun/modeles/progression';

const CLEF_SITUATIONS_FAITES = 'situationsFaites';

export const CLEF_IDENTIFIANT = 'identifiantUtilisateur';
export const CHANGEMENT_CONNEXION = 'changementConnexion';

export default class RegistreUtilisateur extends EventEmitter {
  constructor ($) {
    super();
    this.$ = $ || jQuery;
  }

  inscris (nom, codeCampagne) {
    return this.$.ajax({
      type: 'POST',
      url: `${process.env.URL_SERVEUR}/api/evaluations`,
      data: JSON.stringify({ nom: nom, code_campagne: codeCampagne }),
      contentType: 'application/json; charset=utf-8'
    }).then((data) => {
      window.localStorage.setItem(CLEF_IDENTIFIANT, JSON.stringify(data));
      this.emit(CHANGEMENT_CONNEXION);
    });
  }

  estConnecte () {
    return !!this.identifiant();
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

  identifiant () {
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

  progression () {
    return new Progression(this.situationsFaites());
  }

  deconnecte () {
    window.localStorage.removeItem(CLEF_IDENTIFIANT);
    window.localStorage.removeItem(CLEF_SITUATIONS_FAITES);
    this.emit(CHANGEMENT_CONNEXION);
  }
}
