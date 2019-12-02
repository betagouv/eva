import 'tri/styles/situation.scss';
import {
  PIECE_BIEN_PLACEE,
  PIECE_MAL_PLACEE,
  PIECE_DEPOSE_HORS_BACS,
  PIECE_PRISE
} from 'tri/modeles/piece';
import VueBac from 'commun/vues/bac.js';
import VuePiece from 'tri/vues/piece.js';
import VueChronometre from 'tri/vues/chronometre.js';
import DeplaceurPieces from 'commun/composants/deplaceur_pieces';
import EvenementPieceBienPlacee from 'commun/modeles/evenement_piece_bien_placee';
import EvenementPieceMalPlacee from 'commun/modeles/evenement_piece_mal_placee';
import EvenementPiecePrise from 'commun/modeles/evenement_piece_prise';
import EvenementPieceDeposeHorsBacs from 'commun/modeles/evenement_piece_depose_hors_bacs';

export default class VueSituationTri {
  constructor (situation, journal, depotRessources) {
    this.depotRessources = depotRessources;
    this.chronometre = new VueChronometre(situation, depotRessources);
    this.situation = situation;
    this.deplaceurPieces = new DeplaceurPieces();
    this.envoiEvenementsAuJournal(journal);
    this.ajoutEcouteursPourLesSons();
  }

  affiche (pointInsertion, $) {
    $(pointInsertion).addClass('tri')
      .css('background-image', `url('${this.depotRessources.fondSituation().src}')`);

    this.situation.bacs().forEach((bac) => {
      const vueBac = new VueBac(bac);
      vueBac.affiche(pointInsertion, $);
    });

    this.situation.piecesAffichees().forEach((piece) => {
      const vuePiece = new VuePiece(piece, this.depotRessources, this.deplaceurPieces);
      vuePiece.affiche(pointInsertion, $);
    });

    this.chronometre.affiche(pointInsertion, $);
    this.deplaceurPieces.activeDeplacementPieces(pointInsertion, $);
  }

  envoiEvenementsAuJournal (journal) {
    const envoiEvenementPiece = (Classe) => {
      return (piece, bac) => {
        const donneeBac = bac ? { bac: bac.categorie() } : {};
        journal.enregistre(new Classe({ piece: piece.categorie(), ...donneeBac }));
      };
    };
    this.situation.on(PIECE_BIEN_PLACEE, envoiEvenementPiece(EvenementPieceBienPlacee));
    this.situation.on(PIECE_MAL_PLACEE, envoiEvenementPiece(EvenementPieceMalPlacee));
    this.situation.on(PIECE_DEPOSE_HORS_BACS, envoiEvenementPiece(EvenementPieceDeposeHorsBacs));
    this.situation.on(PIECE_PRISE, envoiEvenementPiece(EvenementPiecePrise));
  }

  ajoutEcouteursPourLesSons () {
    this.situation.on(PIECE_BIEN_PLACEE, () => this.depotRessources.sonBonBac().start());
    this.situation.on(PIECE_MAL_PLACEE, () => this.depotRessources.sonMauvaisBac().start());
  }
}
