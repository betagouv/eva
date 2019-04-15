import Evenement from 'commun/modeles/evenement';

export default class EvenementPieceBienPlacee extends Evenement {
  nom () {
    return 'pieceBienPlacee';
  }
}
