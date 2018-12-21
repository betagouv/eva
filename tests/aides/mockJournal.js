export class MockJournal {
  constructor () {
    this.journal = [];
  }

  enregistre (typeEvenement, valeur) {
    this.journal.push({ type: typeEvenement, valeur: valeur });
  }

  getContenu () {
    return this.journal;
  }
}
