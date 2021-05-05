import EvenementPieceRatee from 'controle/modeles/evenement_piece_ratee';

describe("l'événement de pièce ratée", function () {
  it('retourne son nom', function () {
    expect(new EvenementPieceRatee().nom()).toEqual('pieceRatee');
  });

  it('retourne ses donnees', function () {
    const donnees = { piece: { conforme: true } };
    expect(new EvenementPieceRatee(donnees).donnees()).toEqual(donnees);
  });
});
