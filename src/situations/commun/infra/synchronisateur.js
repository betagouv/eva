export default class Synchronisateur {
  constructor (registreUtilisateur) {
    this.registreUtilisateur = registreUtilisateur;
    this.enCoursDeSynchronisation = false;
  }

  recupereReseau (event) {
    if (this.enCoursDeSynchronisation) { return; }

    this.enCoursDeSynchronisation = true;
    Promise.all(this.synchroniseEvaluations())
      .catch((erreur) => {
        console.error(erreur);
      })
      .finally(() => {
        this.enCoursDeSynchronisation = false;
      });
  }

  synchroniseEvaluations () {
    const evaluations = this.registreUtilisateur.listeEvaluationsLocales();
    const promesses = [];

    Object.entries(evaluations).forEach(([idClient, evaluation]) => {
      let promesse;
      if (evaluation.id) {
        promesse = this.registreUtilisateur.enregistreContact(evaluation.email, evaluation.telephone);
      } else {
        const data = { nom: evaluation.nom, code_campagne: evaluation.code_campagne };
        promesse = this.registreUtilisateur.creeEvaluation(data);
      }
      promesses.push(promesse);
    });
    return promesses;
  }
}
