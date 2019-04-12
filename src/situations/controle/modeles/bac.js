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
}
