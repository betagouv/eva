function mapToObj (map) {
  const obj = {};
  for (let [clef, valeur] of map) {
    obj[clef] = valeur;
  }
  return obj;
}

export class Journal {
  constructor (maintenant, depot) {
    this.maintenant = maintenant;
    this.depot = depot;
  }

  enregistreDemarrage () {
    this.depot.enregistre(
      {
        date: this.maintenant(),
        type: 'demarrage'
      }
    );
  }

  enregistreStop () {
    this.depot.enregistre(
      {
        date: this.maintenant(),
        type: 'stop'
      }
    );
  }

  enregistreOuvertureContenant (contenant) {
    this.depot.enregistre(
      {
        date: this.maintenant(),
        type: 'ouvertureContenant',
        description: contenant
      }
    );
  }

  enregistreOuvertureSaisieInventaire () {
    this.depot.enregistre(
      {
        date: this.maintenant(),
        type: 'ouvertureSaisieInventaire'
      }
    );
  }

  enregistreSaisieInventaire (resultat, reponses) {
    this.depot.enregistre(
      {
        date: this.maintenant(),
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
