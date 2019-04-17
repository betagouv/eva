const PREFERENCE_ETAT_MUET = 'situation.muet';

export default class PreferencesDev {
  enregistreEtatMuet (muet) {
    window.localStorage.setItem(PREFERENCE_ETAT_MUET, muet);
  }

  consulteEtatMuet () {
    return window.localStorage.getItem(PREFERENCE_ETAT_MUET);
  }
}
