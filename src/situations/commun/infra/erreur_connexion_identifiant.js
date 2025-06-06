export default class ErreurConnexionIdentifiant extends Error {
  constructor (...params) {
    super(...params);
    this.name = 'ErreurConnexionIdentifiant';
  }
}
