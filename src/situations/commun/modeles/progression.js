export default class Progression {
  constructor (situationsFaites) {
    this.situationsFaites = situationsFaites;
  }

  niveau () {
    return this.situationsFaites.length + 1;
  }
}
