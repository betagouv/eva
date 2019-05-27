import Evenement from 'commun/modeles/evenement';

export default class EvenementPieceMalPlacee extends Evenement {
  constructor (donnees = {}) {
    super('pieceMalPlacee', donnees);
  }
}
