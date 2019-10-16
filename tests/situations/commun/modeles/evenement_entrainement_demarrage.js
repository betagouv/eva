import EvenementEntrainementDemarrage from 'commun/modeles/evenement_entrainement_demarrage';

describe("l'événement de demarrage de l'entrainement", function () {
  it('retourne son nom', function () {
    expect(new EvenementEntrainementDemarrage().nom()).to.eql('demarrageEntrainement');
  });
});
