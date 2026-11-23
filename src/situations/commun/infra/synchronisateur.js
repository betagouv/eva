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
      let promesse = this.creeOuMetsAJourEvaluation(evaluation, idClient)
        .then((evaluationServeur) => {
          if (!evaluationServeur) return;
          return this.synchroniseEvenements(idClient, evaluationServeur).then(() => {
            this.supprimeDuLocalSiTerminee(idClient, evaluation);
          });
        });

      promesses.push(promesse);
    });
    return promesses;
  }

  creeOuMetsAJourEvaluation (evaluation, idClient) {
    let promesse;
    if (evaluation.id) {
      promesse = this.registreUtilisateur.metsAJourEvaluation(evaluation.id, evaluation)
        .catch((erreur) => {
          if (this.supprimeDuLocalSiAbsenteDuServeur(idClient, erreur)) {
            return null;
          }
          throw erreur;
        });
    } else {
      promesse = this.registreUtilisateur.creeEvaluation(evaluation).then((evaluationServeur) => {
        this.registreUtilisateur.enregistreUtilisateurEnLocal(evaluationServeur, idClient);
        return evaluationServeur;
      });
    }

    return promesse;
  }

  synchroniseEvenements (idClient, evaluationServeur) {
    return this.registreEvenements.creeEvenements(idClient, evaluationServeur.id);
  }

  supprimeDuLocalSiTerminee (idClient, evaluation) {
    if (evaluation.terminee_le && !this.estEvaluationEnCours(idClient)) {
      this.supprimeDuLocalStorage(idClient);
    }
  }

  supprimeDuLocalSiAbsenteDuServeur (idClient, erreur) {
    if (erreur.status === 404 && !this.estEvaluationEnCours(idClient)) {
      this.supprimeDuLocalStorage(idClient);
      return true;
    }
    return false;
  }

  supprimeDuLocalSiObsolete (idClient, evaluation, aujourdhui = new Date()) {
    const unMoisAvant = new Date(aujourdhui);
    unMoisAvant.setMonth(unMoisAvant.getMonth() - 1);

    if (new Date(evaluation.debutee_le) < unMoisAvant) {
      this.supprimeDuLocalStorage(idClient);
      return true;
    }
    return false;
  }

  estEvaluationEnCours (idClient) {
    return this.registreUtilisateur.idClient() === idClient;
  }

  supprimeDuLocalStorage (idClient) {
    this.registreEvenements.supprimeDuLocalStorage(idClient);
    this.registreUtilisateur.supprimeDuLocalStorage(idClient);
  }
}
