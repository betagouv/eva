export default class ErreurConnexionCodeBeneficiaire extends Error {
  constructor (...params) {
    super(...params);
    this.name = 'ErreurConnexionCodeBeneficiaire';
  }
}
