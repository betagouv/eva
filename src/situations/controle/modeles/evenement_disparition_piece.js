import Evenement from 'commun/modeles/evenement';

export default class EvenementDisparitionPiece extends Evenement {
  constructor () {
    super();
    this._nom = 'disparitionPiece';
  }

  nom () {
    return this._nom;
  }
}
