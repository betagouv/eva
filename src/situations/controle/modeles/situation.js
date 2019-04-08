import { Piece } from 'controle/modeles/piece';
import SituationCommune from 'commun/modeles/situation';

export const NOUVELLE_PIECE = 'nouvellePiece';

export class Situation extends SituationCommune {
  constructor ({ cadence, scenario, dureeViePiece, positionApparitionPieces, consigneAudio }) {
    super();
    this.cadence = cadence;
    this.scenario = scenario;
    this.positionApparition = positionApparitionPieces;
    this._dureeViePiece = dureeViePiece;
    this.consigneAudio = consigneAudio;
    this._piecesEnCours = [];
  }

  cadenceArriveePieces () {
    return this.cadence;
  }

  dureeViePiece () {
    return this._dureeViePiece;
  }

  sequenceTerminee () {
    return this.scenario.length === 0;
  }

  pieceSuivante () {
    const donneesPiece = this.scenario.shift();
    return new Piece({ x: this.positionApparition.x,
      y: this.positionApparition.y,
      conforme: donneesPiece.conforme,
      image: donneesPiece.image });
  }

  piecesEnCours () {
    return this._piecesEnCours;
  }

  demarre () {
    const afficheProchainePiece = () => {
      if (this.sequenceTerminee()) {
        clearInterval(this.identifiantIntervalle);
        return;
      }

      const piece = this.pieceSuivante();
      this._piecesEnCours.push(piece);
      this.emit(NOUVELLE_PIECE, piece);
    };
    afficheProchainePiece();
    this.identifiantIntervalle = setInterval(
      afficheProchainePiece,
      this.cadence
    );
  }
}
