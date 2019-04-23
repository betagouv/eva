const PREFERENCE_ETAT_MUET = 'situation.muet';
const PREFERENCE_ETAT_CONFIRMATION_QUITTER = 'situation.confirmation-quitter-en-cours';

export default class PreferencesDev {
  enregistreEtatMuet (muet) {
    window.localStorage.setItem(PREFERENCE_ETAT_MUET, muet);
  }

  consulteEtatMuet () {
    return window.localStorage.getItem(PREFERENCE_ETAT_MUET);
  }

  consulteEtatConfirmationQuitterEnCours () {
    return window.localStorage.getItem(PREFERENCE_ETAT_CONFIRMATION_QUITTER);
  }

  enregistreEtatConfirmationQuitterEnCours (confirmation) {
    window.localStorage.setItem(PREFERENCE_ETAT_CONFIRMATION_QUITTER, confirmation);
  }
}
