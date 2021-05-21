export default class ErreurCampagne extends Error {
  constructor (...params) {
    super(...params);
    this.name = 'ErreurCampagne';
  }
}
