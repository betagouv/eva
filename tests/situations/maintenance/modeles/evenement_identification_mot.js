import EvenementIdentificationMot from 'maintenance/modeles/evenement_identification_mot';

describe("l'événement d'identification de mot", function () {
  it('retourne son nom', function () {
    expect(new EvenementIdentificationMot().nom()).to.eql('identificationMot');
  });
});
