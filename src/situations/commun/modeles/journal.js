import { v4 as uuidv4 } from 'uuid';

import RegistreUtilisateur from 'commun/infra/registre_utilisateur';
import RegistreEvenements from 'commun/infra/registre_evenements';

export class Journal {
  constructor (maintenant, session, situation, registreEvenements, registreUtilisateur) {
    this.maintenant = maintenant;
    this.sessionId = session;
    this.situation = situation;
    this.registreUtilisateur = registreUtilisateur;
    this.registreEvenements = registreEvenements;
    this.position = 0;
  }

  attendFinEnregistrement () {
    return this.registreEvenements.attendFinEnregistrement();
  }

  enregistre (evenement, timeout) {
    const payLoad = {
      date: this.maintenant(),
      session_id: this.sessionId,
      situation: this.situation,
      nom: evenement.nom(),
      donnees: evenement.donnees(),
      evaluation_id: this.registreUtilisateur.idEvaluation(),
      position: this.position++
    };
    return this.registreEvenements.enregistre(payLoad, timeout);
  }

  enregistreSituationFaite () {
    this.registreUtilisateur.enregistreSituationFaite(this.situation);
  }
}

export default function creeJournalPourSituation (identifiantSituation) {
  const session = uuidv4();
  const registreUtilisateur = new RegistreUtilisateur();
  const registreEvenements = new RegistreEvenements(registreUtilisateur);
  return new Journal(Date.now, session, identifiantSituation, registreEvenements, registreUtilisateur);
}
