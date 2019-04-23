import EventEmitter from 'events';

export const CHARGEMENT = 'chargement';
export const ERREUR_CHARGEMENT = 'erreurDeChargement';
export const ATTENTE_DEMARRAGE = 'attenteDemarrage';
export const LECTURE_CONSIGNE = 'lectureConsigne';
export const CONSIGNE_ECOUTEE = 'consigneEcoutée';
export const DEMARRE = 'démarré';
export const FINI = 'fini';
export const STOPPEE = 'stoppée';

export const CHANGEMENT_ETAT = 'changementEtat';

export default class Situation extends EventEmitter {
  constructor () {
    super();
    this._etat = CHARGEMENT;
  }

  etat () {
    return this._etat;
  }

  modifieEtat (etat) {
    this._etat = etat;
    this.emit(CHANGEMENT_ETAT, etat);
  }
}
