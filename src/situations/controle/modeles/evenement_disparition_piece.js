import Evenement from 'commun/modeles/evenement';

export default class EvenementDisparitionPiece extends Evenement {
  constructor (donneesPiece) {
    super(donneesPiece);
    this._nom = 'disparitionPiece';
  }

  nom () {
    return this._nom;
  }
}
