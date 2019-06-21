import uuidv4 from 'uuid/v4';

import DepotJournal from 'commun/infra/depot_journal';
import RegistreUtilisateur from 'commun/infra/registre_utilisateur';

export class Journal {
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

export default function creeJournalPourSituation (identifiantSituation) {
  const session = uuidv4();
  const depotJournal = new DepotJournal();
  const registreUtilisateur = new RegistreUtilisateur();
  return new Journal(Date.now, session, identifiantSituation, depotJournal, registreUtilisateur);
}
