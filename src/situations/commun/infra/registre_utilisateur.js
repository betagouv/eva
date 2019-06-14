import EventEmitter from 'events';

import Progression from 'commun/modeles/progression';

const CLEF_IDENTIFIANT = 'identifiantUtilisateur';
const CLEF_SITUATIONS_FAITES = 'situationsFaites';

export const CHANGEMENT_NOM = 'changementNom';

export default class RegistreUtilisateur extends EventEmitter {
  inscris (identifiantUtilisateur) {
    window.localStorage.setItem(CLEF_IDENTIFIANT, identifiantUtilisateur);
    this.emit(CHANGEMENT_NOM);
  }

  estConnecte () {
    return !!this.consulte();
  }

  consulte () {
    return window.localStorage.getItem(CLEF_IDENTIFIANT);
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
  }
}
