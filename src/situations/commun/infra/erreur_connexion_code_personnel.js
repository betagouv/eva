export default class ErreurConnexionCodePersonnel extends Error {
  constructor (...params) {
    super(...params);
    this.name = 'ErreurConnexionCodePersonnel';
  }
}
