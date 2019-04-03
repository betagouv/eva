import { Bac } from 'controle/modeles/bac';
import { PIECE_CONFORME, PIECE_DEFECTUEUSE } from 'controle/modeles/piece';
import { VueBac } from 'controle/vues/bac';
import { VuePiece } from 'controle/vues/piece';

export class VueSituation {
  constructor (situation, callbackApresCreationPiece) {
    function nouveauBac (categorie, { x, y }) {
      return new Bac({ categorie, x, y, largeur: 30, hauteur: 40 });
    }

    function creeBacs () {
      const bacs = [];
      bacs.push(nouveauBac(PIECE_CONFORME, { x: 10, y: 10 }));
      bacs.push(nouveauBac(PIECE_DEFECTUEUSE, { x: 60, y: 10 }));
      return bacs;
    }

    this.situation = situation;
    this.callbackApresCreationPiece = callbackApresCreationPiece;
    this._bacs = creeBacs();
  }

  bacs () {
    return this._bacs;
  }

  affiche (pointInsertion, $) {
    function afficheBac (bac) {
      const vueBac = new VueBac(bac);
      vueBac.affiche(pointInsertion, $);
    }

    this._bacs.forEach(afficheBac);

    this.demarre(pointInsertion, $);
  }

  demarre (pointInsertion, $) {
    const afficheProchainePiece = () => {
      if (this.situation.sequenceTerminee()) {
        clearInterval(this.identifiantIntervalle);
        return;
      }

      const piece = this.situation.pieceSuivante();
      const vuePiece = new VuePiece(piece, this.situation.dureeViePiece(), this.callbackApresCreationPiece);
      vuePiece.affiche(pointInsertion, $);
    };
    afficheProchainePiece();
    this.identifiantIntervalle = setInterval(
      afficheProchainePiece,
      this.situation.cadenceArriveePieces()
    );
  }
}
