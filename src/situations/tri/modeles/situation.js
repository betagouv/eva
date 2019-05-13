import SituationCommune from 'commun/modeles/situation';

export default class Situation extends SituationCommune {
  constructor ({ pieces }) {
    super();
    this.pieces = pieces;
  }
}
