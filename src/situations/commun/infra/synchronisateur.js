export default class Synchronisateur {
  constructor (registreUtilisateur) {
    this.registreUtilisateur = registreUtilisateur;
  }

  recupereReseau (event) {
    const evaluations = this.registreUtilisateur.listeEvaluationsLocales();

    Object.entries(evaluations).forEach(([idClient, evaluation]) => {
      this.registreUtilisateur.inscris(evaluation.nom, evaluation.code_campagne);
    });
  }
}
