import Evenement from 'commun/modeles/evenement';

export default class EvenementPiecePrise extends Evenement {
  constructor (donnees = {}) {
    super('piecePrise', donnees);
  }
}
