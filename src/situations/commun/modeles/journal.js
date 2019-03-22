export class Journal {
  constructor (maintenant, session, situation, depot) {
    this.maintenant = maintenant;
    this.depot = depot;
    this.sessionId = session;
    this.situation = situation;
  }

  enregistreEvenement (evenement) {
    this.enregistre(evenement.nom(), evenement.donnees());
  }

  enregistre (nom, donnees = {}) {
    this.depot.enregistre(
      {
        date: this.maintenant(),
        sessionId: this.sessionId,
        situation: this.situation,
        nom,
        donnees
      }
    );
  }

  evenements () {
    return this.depot.evenements();
  }
}
