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
    this.depot.enregistre(
      {
        date: this.maintenant(),
        sessionId: this.sessionId,
        type: 'demarrage'
      }
    );
  }

  enregistreStop () {
    this.depot.enregistre(
      {
        date: this.maintenant(),
        sessionId: this.sessionId,
        type: 'stop'
      }
    );
  }

  enregistreOuvertureContenant (contenant) {
    this.depot.enregistre(
      {
        date: this.maintenant(),
        sessionId: this.sessionId,
        type: 'ouvertureContenant',
        description: contenant
      }
    );
  }

  enregistreOuvertureSaisieInventaire () {
    this.depot.enregistre(
      {
        date: this.maintenant(),
        sessionId: this.sessionId,
        type: 'ouvertureSaisieInventaire'
      }
    );
  }

  enregistreSaisieInventaire (resultat, reponses) {
    this.depot.enregistre(
      {
        date: this.maintenant(),
        sessionId: this.sessionId,
        type: 'saisieInventaire',
        resultat,
        reponses: mapToObj(reponses)
      }
    );
  }

  evenements () {
    return this.depot.evenements();
  }
}
