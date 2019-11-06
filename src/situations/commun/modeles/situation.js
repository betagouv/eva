import EventEmitter from 'events';

export const CHARGEMENT = 'chargement';
export const ERREUR_CHARGEMENT = 'erreurDeChargement';
export const ATTENTE_DEMARRAGE = 'attenteDemarrage';
export const ENTRAINEMENT_DEMARRE = 'entrainementDemarré';
export const ENTRAINEMENT_FINI = 'entrainementFini';
export const DEMARRE = 'démarré';
export const FINI = 'fini';
export const STOPPEE = 'stoppée';

export const CHANGEMENT_ETAT = 'changementEtat';
export const ACTIVATION_AIDE = 'activationAide';

export default class Situation extends EventEmitter {
  constructor (modeEntrainement = false, aideDisponible = false) {
    super();
    this._etat = CHARGEMENT;
    this._entrainementDisponible = modeEntrainement;
    this._aideDisponible = aideDisponible;
    this.aideActivee = false;
  }

  etat () {
    return this._etat;
  }

  modifieEtat (etat) {
    if (etat === this.etat()) return;

    this._etat = etat;
    this.emit(CHANGEMENT_ETAT, etat);
  }

  entrainementDisponible () {
    return this._entrainementDisponible;
  }

  aideDisponible () {
    return this._aideDisponible;
  }

  activeAide () {
    this.aideActivee = true;
    this.emit(ACTIVATION_AIDE);
  }
}
