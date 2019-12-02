import EvenementPieceDeposeDansBac from 'controle/modeles/evenement_piece_depose_dans_bac';

describe("l'événement de dépose de pièce dans un bac", function () {
  it('retourne son nom', function () {
    expect(new EvenementPieceDeposeDansBac().nom()).to.eql('pieceDeposeDansBac');
  });

  it('retourne ses donnees', function () {
    const donnees = { piece: { conforme: true } };
    expect(new EvenementPieceDeposeDansBac(donnees).donnees()).to.eql(donnees);
  });
});
