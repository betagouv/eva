export default class Synchronisateur {
  constructor (registreUtilisateur) {
    this.registreUtilisateur = registreUtilisateur;
  }

  recupereReseau (event) {
    const evaluations = this.registreUtilisateur.listeEvaluationsLocales();

    Object.entries(evaluations).forEach(([idClient, evaluation]) => {
      if (evaluation.id) {
        this.registreUtilisateur.enregistreContact(evaluation.email, evaluation.telephone);
      } else {
        const data = { nom: evaluation.nom, code_campagne: evaluation.code_campagne };
        this.registreUtilisateur.creeEvaluation(data);
      }
    });
  }
}
