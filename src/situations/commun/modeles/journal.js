function mapToObj (map) {
  const obj = {};
  for (let [clef, valeur] of map) {
    obj[clef] = valeur;
  }
  return obj;
}

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

  enregistreStop () {
    this.enregistre('stop');
  }

  enregistreOuvertureContenant (contenant) {
    this.enregistre('ouvertureContenant', contenant);
  }

  enregistreOuvertureSaisieInventaire () {
    this.enregistre('ouvertureSaisieInventaire');
  }

  enregistreSaisieInventaire (resultat, reponses) {
    this.enregistre('saisieInventaire', { resultat, reponses: mapToObj(reponses) });
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
