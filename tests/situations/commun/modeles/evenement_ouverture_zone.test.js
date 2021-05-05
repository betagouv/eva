import EvenementOuvertureZone from 'commun/modeles/evenement_ouverture_zone';

describe("l'événement de l'ouverture de la zone", function () {
  it('retourne son nom', function () {
    expect(new EvenementOuvertureZone().nom()).toEqual('ouvertureZone');
  });

  it('retourne ses donnees', function () {
    const donnees = { zone: 'La zone' };
    expect(new EvenementOuvertureZone(donnees).donnees()).toEqual(donnees);
  });
});
