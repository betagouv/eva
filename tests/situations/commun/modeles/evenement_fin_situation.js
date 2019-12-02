import EvenementFinSituation from 'commun/modeles/evenement_fin_situation';

describe("l'événement de fin de situation", function () {
  it('retourne son nom', function () {
    expect(new EvenementFinSituation().nom()).to.eql('finSituation');
  });
});
