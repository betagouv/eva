export default class Synchronisateur {
  constructor (registreUtilisateur, registreEvenements) {
    this.registreUtilisateur = registreUtilisateur;
    this.registreEvenements = registreEvenements;
    this.enCoursDeSynchronisation = false;
  }

  recupereReseau (event) {
    if (this.enCoursDeSynchronisation) { return; }

    this.enCoursDeSynchronisation = true;
    Promise.all(this.synchroniseEvaluations())
      .catch((erreur) => {
        this.echecSynchronisation(erreur);
      })
      .finally(() => {
        this.enCoursDeSynchronisation = false;
      });
  }

  echecSynchronisation (erreur) {
    console.error(erreur);
  }

  synchroniseEvaluations () {
    const evaluations = this.registreUtilisateur.listeEvaluationsLocales();
    const promesses = [];

    Object.entries(evaluations).forEach(([idClient, evaluation]) => {
      let promesse;
      if (evaluation.id) {
        promesse = this.registreUtilisateur.enregistreContact(evaluation.id, evaluation.email, evaluation.telephone);
      } else {
        const data = { nom: evaluation.nom, code_campagne: evaluation.code_campagne };
        promesse = this.registreUtilisateur.creeEvaluation(data).then((utilisateur) => {
          this.registreUtilisateur.enregistreUtilisateurEnLocal(utilisateur, idClient);
          return utilisateur;
        });
      }
      promesse = promesse.then((utilisateur) => {
        return this.registreEvenements.creeEvenements(idClient, utilisateur.id);
      });
      promesses.push(promesse);
    });
    return promesses;
  }
}
