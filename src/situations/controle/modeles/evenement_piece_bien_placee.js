import Evenement from 'commun/modeles/evenement';

export default class EvenementPieceBienPlacee extends Evenement {
  constructor (donnees = {}) {
    super('pieceBienPlacee', donnees);
  }
}
