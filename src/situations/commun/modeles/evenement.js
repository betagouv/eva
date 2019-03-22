export default class Evenement {
  constructor (donnees = {}) {
    this._donnees = donnees;
  }

  nom () {
    throw new Error('Pas implémenté');
  }

  donnees () {
    return this._donnees;
  }
}
