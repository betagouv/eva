import Evenement from 'commun/modeles/evenement';

export default class EvenementPieceMalPlacee extends Evenement {
  nom () {
    return 'pieceMalPlacee';
  }
}
