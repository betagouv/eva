export default class Evenement {
  constructor (nom, donnees = {}) {
    this._nom = nom;
    this._donnees = donnees;
  }

  nom () {
    return this._nom;
  }

  donnees () {
    return this._donnees;
  }
}
