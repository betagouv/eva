import EvenementSaisieInventaire from 'inventaire/modeles/evenement_saisie_inventaire';

describe("l'événement d'ouverture de saisie d'inventaire", function () {
  it('retourne son nom', function () {
    expect(new EvenementSaisieInventaire().nom()).toEqual('saisieInventaire');
  });

  it('retourne ses donnees', function () {
    const reponses = new Map();
    reponses.set('1', { quantite: 4 });
    reponses.set('2', { quantite: 6 });
    const resultatValidation = new Map();
    resultatValidation.set('1', true);
    resultatValidation.set('2', false);
    const donnees = { reussite: false, reponses, resultatValidation };
    expect(new EvenementSaisieInventaire(donnees).donnees()).toEqual({
      reussite: false,
      reponses: {
        1: {
          quantite: 4,
          reussite: true
        },
        2: {
          quantite: 6,
          reussite: false
        }
      }
    });
  });
});
