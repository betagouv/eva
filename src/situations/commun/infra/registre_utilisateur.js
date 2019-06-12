import EventEmitter from 'events';

const CLEF_IDENTIFIANT = 'identifiantUtilisateur';

export const CHANGEMENT_NOM = 'changementNom';

export default class RegistreUtilisateur extends EventEmitter {
  inscris (identifiantUtilisateur) {
    window.localStorage.setItem(CLEF_IDENTIFIANT, identifiantUtilisateur);
    this.emit(CHANGEMENT_NOM);
  }

  consulte () {
    return window.localStorage.getItem(CLEF_IDENTIFIANT);
  }
}
