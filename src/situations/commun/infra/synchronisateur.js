export default class Synchronisateur {
  constructor (registreUtilisateur) {
    this.registreUtilisateur = registreUtilisateur;
  }

  recupereReseau (event) {
    const evaluations = this.registreUtilisateur.listeEvaluationsLocales();
  }
}
