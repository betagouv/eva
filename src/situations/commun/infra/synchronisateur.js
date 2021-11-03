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
      let promesse = this.creeOuMetsAJourEvaluation(evaluation, idClient);

      promesse = promesse.then((utilisateur) => {
        return this.synchroniseEvenements(idClient, utilisateur);
      }).finally(() => {
        return this.supprimeEvaluationDuLocal(idClient, evaluation);
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

  supprimeEvaluationDuLocal (idClient, evaluation) {
    const unMoisAvant = new Date();
    unMoisAvant.setMonth(unMoisAvant.getMonth() - 1);

    if (evaluation.terminee_le || new Date(evaluation.debutee_le) < unMoisAvant) {
      this.registreEvenements.supprimeEvenementsLocale(idClient);
      this.registreUtilisateur.supprimeEvaluationLocale(idClient);
    }
  }
}
