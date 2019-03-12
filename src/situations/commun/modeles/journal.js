function mapToObj (map) {
  const obj = {};
  for (let [clef, valeur] of map) {
    obj[clef] = valeur;
  }
  return obj;
}

export class Journal {
  constructor (maintenant, session, depot) {
    this.maintenant = maintenant;
    this.depot = depot;
    this.sessionId = session;
  }

  enregistreDemarrage () {
    this.enregistre('demarrage');
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
        nom,
        donnees
      }
    );
  }

  evenements () {
    return this.depot.evenements();
  }
}
