import SituationCommune from 'commun/modeles/situation';

export default class Situation extends SituationCommune {
  constructor (situation, journal, depotRessources) {
    super();
    this.journal = journal;
    this.situation = situation;
    this.depotRessources = depotRessources;
  }

  affiche (pointInsertion, $) {
  }
}
