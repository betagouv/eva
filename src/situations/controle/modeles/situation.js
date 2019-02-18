import { Piece } from 'controle/modeles/piece.js';

export class Situation {
  constructor ({ cadence, scenario, positionApparitionPieces }) {
    this.cadence = cadence;
    this.scenario = scenario;
    this.positionApparition = positionApparitionPieces;
  }

  cadenceArriveePieces () {
    return this.cadence;
  }

  sequenceTerminee () {
    return this.scenario.length === 0;
  }

  pieceSuivante () {
    const estConforme = this.scenario.shift();
    return new Piece({ x: this.positionApparition.x, y: this.positionApparition.y, conforme: estConforme });
  }
}
