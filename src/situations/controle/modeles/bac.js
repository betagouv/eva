import BacCommun, { CHANGEMENT_ETAT_SURVOLE } from 'commun/modeles/bac';

export { CHANGEMENT_ETAT_SURVOLE };

export default class Bac extends BacCommun {
  constructor ({ categorie, ...reste }) {
    super(reste);
    this._categorie = categorie;
  }

  categorie () {
    return this._categorie;
  }

  correspondALaCategorie (piece) {
    return piece.estConforme() === this.categorie();
  }
}
