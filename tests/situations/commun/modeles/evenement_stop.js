import EvenementStop from 'commun/modeles/evenement_stop';

describe("l'événement de stop", function () {
  it('retourne son nom', function () {
    expect(new EvenementStop().nom()).to.eql('stop');
  });
});
