import EvenementIdentificationDanger from 'securite/modeles/evenement_identification_danger';

describe("l'événement d'identification du danger", function () {
  it('retourne son nom', function () {
    expect(new EvenementIdentificationDanger().nom()).to.eql('identificationDanger');
  });

  it('retourne ses donnees', function () {
    const donnees = { zone: 'LaZone', reponse: 'danger' };
    expect(new EvenementIdentificationDanger(donnees).donnees()).to.eql(donnees);
  });
});
