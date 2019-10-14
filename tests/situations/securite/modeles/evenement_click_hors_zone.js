import EvenementClickHorsZone from 'securite/modeles/evenement_click_hors_zone';

describe("l'événement de click sur la situation hors zone", function () {
  it('retourne son nom', function () {
    expect(new EvenementClickHorsZone().nom()).to.eql('clickHorsZone');
  });
});
