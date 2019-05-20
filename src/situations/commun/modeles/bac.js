import EventEmitter from 'events';

export const CHANGEMENT_ETAT_SURVOLE = 'changementEtatSurvole';

export default class Bac extends EventEmitter {
  constructor ({ x, y, largeur, hauteur, categorie }) {
    super();
    this._dimensions = { largeur, hauteur };
    this._position = { x, y };
    this._categorie = categorie;
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
    const { largeur, hauteur } = piece.dimensions();
    function estEntre (positionPiece, taillePiece, positionBac, tailleBac) {
      return (positionPiece >= positionBac && positionPiece <= positionBac + tailleBac) ||
        (positionPiece <= positionBac && positionPiece + taillePiece >= positionBac);
    }
    return estEntre(x, largeur, this._position.x, this._dimensions.largeur) &&
      estEntre(y, hauteur, this._position.y, this._dimensions.hauteur);
  }

  correspondALaCategorie (piece) {
    return piece.categorie() === this.categorie();
  }
}
