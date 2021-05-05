import EvenementOuvertureSaisieInventaire from 'inventaire/modeles/evenement_ouverture_saisie_inventaire';

describe("l'événement d'ouverture de saisie d'inventaire", function () {
  it('retourne son nom', function () {
    expect(new EvenementOuvertureSaisieInventaire().nom()).toEqual('ouvertureSaisieInventaire');
  });
});
