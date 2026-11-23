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
      if (this.supprimeDuLocalStorageSi(idClient, this.estObsolete(evaluation))) {
        return;
      }
      let promesse = this.creeOuMetsAJourEvaluation(evaluation, idClient)
        .then((evaluationServeur) => {
          if (!evaluationServeur) return;
          return this.synchroniseEvenements(idClient, evaluationServeur).then(() => {
            this.supprimeDuLocalStorageSi(idClient, this.estTerminee(idClient, evaluation));
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
          if (this.supprimeDuLocalStorageSi(idClient, this.estAbsenteDuServeur(idClient, erreur))) {
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

  estTerminee (idClient, evaluation) {
    return !!evaluation.terminee_le && !this.estEvaluationUtilisateurConnecte(idClient);
  }

  estAbsenteDuServeur (idClient, erreur) {
    return erreur.status === 404 && !this.estEvaluationUtilisateurConnecte(idClient);
  }

  estObsolete (evaluation, aujourdhui = new Date()) {
    const unMoisAvant = new Date(aujourdhui);
    unMoisAvant.setMonth(unMoisAvant.getMonth() - 1);

    return new Date(evaluation.debutee_le) < unMoisAvant;
  }

  estEvaluationUtilisateurConnecte (idClient) {
    return this.registreUtilisateur.idClient() === idClient;
  }

  supprimeDuLocalStorageSi (idClient, condition) {
    if (condition) {
      this.registreEvenements.supprimeDuLocalStorage(idClient);
      this.registreUtilisateur.supprimeDuLocalStorage(idClient);
      return true;
    }
    return false;
  }
}
