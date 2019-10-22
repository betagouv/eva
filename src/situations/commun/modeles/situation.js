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

export default class Situation extends EventEmitter {
  constructor (modeEntrainement = false) {
    super();
    this._etat = CHARGEMENT;
    this._entrainementDisponible = modeEntrainement;
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
}
