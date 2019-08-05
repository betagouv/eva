import uuidv4 from 'uuid/v4';

import DepotJournal from 'commun/infra/depot_journal';
import Utilisateur from 'commun/modeles/utilisateur';

export class Journal {
  constructor (maintenant, session, situation, depot, utilisateur) {
    this.maintenant = maintenant;
    this.depot = depot;
    this.sessionId = session;
    this.situation = situation;
    this.utilisateur = utilisateur;
  }

  enregistre (evenement, timeout) {
    const payLoad = {
      date: this.maintenant(),
      session_id: this.sessionId,
      situation: this.situation,
      nom: evenement.nom(),
      donnees: evenement.donnees(),
      evaluation_id: this.utilisateur.idEvaluation()
    };
    return this.depot.enregistre(payLoad, timeout);
  }

  enregistreSituationDebloquee () {
    this.utilisateur.enregistreSituationDebloquee(this.situation);
  }
}

export default function creeJournalPourSituation (identifiantSituation) {
  const session = uuidv4();
  const depotJournal = new DepotJournal();
  const utilisateur = new Utilisateur();
  return new Journal(Date.now, session, identifiantSituation, depotJournal, utilisateur);
}
