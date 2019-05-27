import Evenement from 'commun/modeles/evenement';

export default class EvenementPieceRatee extends Evenement {
  constructor (donnees = {}) {
    super('pieceRatee', donnees);
  }
}
