import Evenement from 'commun/modeles/evenement';

export default class EvenementPieceDeposeHorsBacs extends Evenement {
  constructor (donnees = {}) {
    super('pieceDeposeHorsBacs', donnees);
  }
}
