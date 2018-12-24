export class Journal {
  constructor (maintenant, depot) {
    this.maintenant = maintenant;
    this.depot = depot;
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

  evenements () {
    return this.depot.evenements();
  }
}
