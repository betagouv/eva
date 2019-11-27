import Evenement from 'commun/modeles/evenement';

export default class EvenementPieceApparition extends Evenement {
  constructor (donnees = {}) {
    super('pieceApparition', donnees);
  }
}
