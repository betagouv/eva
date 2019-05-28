import 'tri/styles/situation.scss';
import VueBac from 'commun/vues/bac.js';
import VuePiece from 'tri/vues/piece.js';
import VueResultat from 'commun/vues/resultat.js';
import DeplaceurPieces from 'commun/composants/deplaceur_pieces';
import chronometre from 'tri/assets/chronometre.png';
import aiguilleSeconde from 'tri/assets/aiguille-seconde.png';
import aiguilleMinute from 'tri/assets/aiguille-minute.png';

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
    $(pointInsertion).append('<div class="chronometre-container"></div>');
    $('.chronometre-container').append(`<img class='chronometre' src=${chronometre}>`);
    $('.chronometre-container').append(`<img class='aiguille-minute' src=${aiguilleMinute}>`);
    $('.chronometre-container').append(`<img class='aiguille-seconde' src=${aiguilleSeconde}>`);

    this.situation.bacs().forEach((bac) => {
      const vueBac = new VueBac(bac);
      vueBac.affiche(pointInsertion, $);
    });

    this.deplaceurPieces.activeDeplacementPieces(pointInsertion, $);
    this.resultat.affiche(pointInsertion, $);
  }
}
