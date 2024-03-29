export default class Synchronisateur {
  constructor (registreUtilisateur, registreEvenements) {
    this.registreUtilisateur = registreUtilisateur;
    this.registreEvenements = registreEvenements;
    this.enCoursDeSynchronisation = false;
  }

  recupereReseau () {
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
      if (this.supprimeDuLocalSiObsolete(idClient, evaluation)) {
        return;
      }
      let promesse = this.creeOuMetsAJourEvaluation(evaluation, idClient);

      promesse = promesse.then((utilisateur) => {
        return this.synchroniseEvenements(idClient, utilisateur).then(() => {
          this.supprimeEvaluationTermineDuLocal(idClient, evaluation);
        });
      });

      promesses.push(promesse);
    });
    return promesses;
  }

  creeOuMetsAJourEvaluation (evaluation, idClient) {
    let promesse;
    if (evaluation.id) {
      promesse = this.registreUtilisateur.metsAJourEvaluation(evaluation.id, evaluation);
    } else {
      promesse = this.registreUtilisateur.creeEvaluation(evaluation).then((utilisateur) => {
        this.registreUtilisateur.enregistreUtilisateurEnLocal(utilisateur, idClient);
        return utilisateur;
      });
    }

    return promesse;
  }

  synchroniseEvenements (idClient, utilisateur) {
    return this.registreEvenements.creeEvenements(idClient, utilisateur.id);
  }

  supprimeEvaluationTermineDuLocal (idClient, evaluation) {
    if (evaluation.terminee_le && this.registreUtilisateur.idClient() !== idClient) {
      this.registreUtilisateur.supprimeDuLocalStorage(idClient);
    }
  }

  supprimeDuLocalSiObsolete (idClient, evaluation, aujourdhui = new Date()) {
    const unMoisAvant = new Date(aujourdhui);
    unMoisAvant.setMonth(unMoisAvant.getMonth() - 1);

    if (new Date(evaluation.debutee_le) < unMoisAvant) {
      this.registreEvenements.supprimeDuLocalStorage(idClient);
      this.registreUtilisateur.supprimeDuLocalStorage(idClient);
      return true;
    }
    return false;
  }
}
