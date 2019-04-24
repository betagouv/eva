export default class Journal {
  constructor (maintenant, session, situation, depot, registre) {
    this.maintenant = maintenant;
    this.depot = depot;
    this.sessionId = session;
    this.situation = situation;
    this.registreUtilisateur = registre;
  }

  enregistre (evenement, timeout) {
    const payLoad = {
      date: this.maintenant(),
      session_id: this.sessionId,
      situation: this.situation,
      nom: evenement.nom(),
      donnees: evenement.donnees(),
      utilisateur: this.registreUtilisateur.consulte()
    };
    return this.depot.enregistre(payLoad, timeout);
  }
}
