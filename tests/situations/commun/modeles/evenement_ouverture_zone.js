import EvenementOuvertureZone from 'commun/modeles/evenement_ouverture_zone';

describe("l'événement de l'ouverture de la zone", function () {
  it('retourne son nom', function () {
    expect(new EvenementOuvertureZone().nom()).to.eql('ouvertureZone');
  });

  it('retourne ses donnees', function () {
    const donnees = { zone: 'La zone' };
    expect(new EvenementOuvertureZone(donnees).donnees()).to.eql(donnees);
  });
});
