const CLEF_IDENTIFIANT = 'identifiantUtilisateur';

export default class RegistreUtilisateur {
  inscris (identifiantUtilisateur) {
    window.localStorage.setItem(CLEF_IDENTIFIANT, identifiantUtilisateur);
  }

  consulte () {
    return window.localStorage.getItem(CLEF_IDENTIFIANT);
  }
}
