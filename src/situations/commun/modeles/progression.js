export default class Progression {
  constructor (situationsFaites, situationsAccessibles) {
    this.situationsFaites = situationsFaites.filter((s) => situationsAccessibles.includes(s));
  }

  niveau () {
    return this.fait() + 1;
  }

  fait () {
    return this.situationsFaites.length;
  }
}
