import EvenementDisparitionPiece from 'controle/modeles/evenement_disparition_piece';

describe("L'événement de disparition d'une pièce", function () {
  it('retourne son nom', function () {
    const evenement = new EvenementDisparitionPiece();
    expect(evenement.nom()).to.equal('disparitionPiece');
  });
});
