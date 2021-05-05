import EvenementPieceApparition from 'controle/modeles/evenement_piece_apparition';

describe("l'événement d'apparition de pièce", function () {
  it('retourne son nom', function () {
    expect(new EvenementPieceApparition().nom()).toEqual('pieceApparition');
  });

  it('retourne ses donnees', function () {
    const donnees = { piece: { conforme: true } };
    expect(new EvenementPieceApparition(donnees).donnees()).toEqual(donnees);
  });
});
