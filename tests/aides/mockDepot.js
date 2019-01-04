export class MockDepot {
  constructor () {
    this.enregistrements = [];
  }

  enregistre (object) {
    this.enregistrements.push(object);
  }

  getContenu () {
    return this.enregistrements;
  }
}
