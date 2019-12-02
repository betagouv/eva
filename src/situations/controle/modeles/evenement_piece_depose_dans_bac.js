import Evenement from 'commun/modeles/evenement';

export default class EvenementPieceDeposeDansBac extends Evenement {
  constructor (donnees = {}) {
    super('pieceDeposeDansBac', donnees);
  }
}
