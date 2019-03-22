import EvenementSaisieInventaire from 'inventaire/modeles/evenement_saisie_inventaire';

describe("l'événement d'ouverture de saisie d'inventaire", function () {
  it('retourne son nom', function () {
    expect(new EvenementSaisieInventaire().nom()).to.eql('saisieInventaire');
  });

  it('retourne ses donnees', function () {
    const reponses = new Map();
    reponses.set('1', { quantite: 4 });
    const donnees = { resultat: true, reponses };
    expect(new EvenementSaisieInventaire(donnees).donnees()).to.eql({
      resultat: true,
      reponses: {
        '1': {
          quantite: 4
        }
      }
    });
  });
});
