import EvenementDisparitionPiece from 'controle/modeles/evenement_disparition_piece';
import { PIECE_CONFORME } from 'controle/modeles/piece';

describe("L'événement de disparition d'une pièce", function () {
  it('retourne son nom', function () {
    const evenement = new EvenementDisparitionPiece();
    expect(evenement.nom()).to.equal('disparitionPiece');
  });

  it('connaît les données relatives à la pièce qui disparaît', function () {
    const evenement = new EvenementDisparitionPiece({
      position: { x: 10, y: 25 },
      dimensions: { largeur: 20, hauteur: 45 },
      categorie: PIECE_CONFORME
    });

    expect(evenement.donnees()).to.eql({
      position: { x: 10, y: 25 },
      dimensions: { largeur: 20, hauteur: 45 },
      categorie: PIECE_CONFORME
    });
  });
});
