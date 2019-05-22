import 'tri/styles/situation.scss';
import VueBac from 'commun/vues/bac.js';
import VuePiece from 'tri/vues/piece.js';
import VueResultat from 'commun/vues/resultat.js';
import DeplaceurPieces from 'commun/composants/deplaceur_pieces';

export default class VueSituationTri {
  constructor (situation, journal, depotRessources) {
    this.depotRessources = depotRessources;
    this.situation = situation;
    this.deplaceurPieces = new DeplaceurPieces(situation);
    this.resultat = new VueResultat(situation, 'tri');
  }

  affiche (pointInsertion, $) {
    $(pointInsertion).addClass('tri')
      .css('background-image', `url('${this.depotRessources.fondSituation().src}')`);

    this.situation.piecesAffichees().forEach((piece) => {
      const vuePiece = new VuePiece(piece, this.depotRessources);
      vuePiece.affiche(pointInsertion, $);
    });

    this.situation.bacs().forEach((bac) => {
      const vueBac = new VueBac(bac);
      vueBac.affiche(pointInsertion, $);
    });

    this.deplaceurPieces.activeDeplacementPieces(pointInsertion, $);
    this.resultat.affiche(pointInsertion, $);
  }
}
