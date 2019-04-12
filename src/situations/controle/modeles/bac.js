import EventEmitter from 'events';
export const CHANGEMENT_ETAT_SURVOLE = 'changementEtatSurvole';

export class Bac extends EventEmitter {
  constructor ({ categorie, x, y, largeur, hauteur }) {
    super();
    this._categorie = categorie;
    this._dimensions = { largeur, hauteur };
    this._position = { x, y };
    this._survole = false;
  }

  dimensions () {
    return this._dimensions;
  }

  position () {
    return this._position;
  }

  categorie () {
    return this._categorie;
  }

  passeEnEtatSurvole () {
    this.changeEtatSurvole(true);
  }

  reinitialiseEtatSurvole () {
    this.changeEtatSurvole(false);
  }

  changeEtatSurvole (etat) {
    this._survole = etat;
    this.emit(CHANGEMENT_ETAT_SURVOLE, this._survole);
  }

  etatSurvole () {
    return this._survole;
  }

  contient (piece) {
    const { x, y } = piece.position();
    function estEntre (positionPiece, positionBac, tailleBac) {
      return positionPiece >= positionBac && positionPiece <= positionBac + tailleBac;
    }
    return estEntre(x, this._position.x, this._dimensions.largeur) &&
        estEntre(y, this._position.y, this._dimensions.hauteur);
  }
}
