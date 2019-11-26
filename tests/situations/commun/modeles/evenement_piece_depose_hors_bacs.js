import EvenementPieceDeposeHorsBacs from 'commun/modeles/evenement_piece_depose_hors_bacs';

describe("l'événement de dépose de pièce hors bacs", function () {
  it('retourne son nom', function () {
    expect(new EvenementPieceDeposeHorsBacs().nom()).to.eql('pieceDeposeHorsBacs');
  });

  it('retourne ses donnees', function () {
    const donnees = { piece: { conforme: true } };
    expect(new EvenementPieceDeposeHorsBacs(donnees).donnees()).to.eql(donnees);
  });
});
