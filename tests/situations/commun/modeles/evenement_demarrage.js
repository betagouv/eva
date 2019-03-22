import EvenementDemarrage from 'commun/modeles/evenement_demarrage.js';

describe("l'événement de demarrage", function () {
  it('retourne son nom', function () {
    expect(new EvenementDemarrage().nom()).to.eql('demarrage');
  });
});
