export default class Progression {
  constructor (situationsFaites) {
    this.situationsFaites = situationsFaites;
  }

  niveau () {
    return this.fait() + 1;
  }

  fait () {
    return this.situationsFaites.length;
  }
}
