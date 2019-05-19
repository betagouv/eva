export default class MockDepot {
  constructor () {
    this.enregistrements = [];
  }

  enregistre (object) {
    this.enregistrements.push(object);
  }

  evenements () {
    return this.enregistrements;
  }
}
