import EvenementFin from 'commun/modeles/evenement_fin';

describe("l'événement de fin", function () {
  it('retourne son nom', function () {
    expect(new EvenementFin().nom()).to.eql('fin');
  });
});
