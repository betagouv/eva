export class Journal {
  constructor (maintenant, session, situation, depot) {
    this.maintenant = maintenant;
    this.depot = depot;
    this.sessionId = session;
    this.situation = situation;
  }

  enregistre (evenement) {
    this.depot.enregistre(
      {
        date: this.maintenant(),
        sessionId: this.sessionId,
        situation: this.situation,
        nom: evenement.nom(),
        donnees: evenement.donnees()
      }
    );
  }

  evenements () {
    return this.depot.evenements();
  }
}
