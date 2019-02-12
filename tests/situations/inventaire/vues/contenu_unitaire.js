import { Contenant } from 'inventaire/modeles/contenant.js';
import { VueContenuUnitaire } from 'inventaire/vues/contenu_unitaire.js';
import jsdom from 'jsdom-global';

describe('vue contenu unitaire', function () {
  let vue;
  let element;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    let pointInsertion = document.getElementById('magasin');
    vue = new VueContenuUnitaire(pointInsertion);
    element = vue.element;
  });

  it("sait s'afficher dans une page web", function () {
    const contenant = new Contenant({ quantite: 1 }, { nom: 'Nova Sky', image: 'chemin_image' });
    vue.affiche(contenant);

    expect(element.classList).to.not.contain('invisible');
    expect(element.classList).to.contain('caisse');
  });

  it('sait afficher la couleur du contenant', function () {
    const contenant = new Contenant({ couleur: 'marron' }, { nom: 'Nova Sky', image: 'chemin_image' });
    vue.affiche(contenant);

    expect(element.classList).to.contain('marron');
  });

  it("sait afficher plusieurs bouteilles d'un certain type", function () {
    const contenant = new Contenant({ quantite: 2 }, { nom: 'Nova Sky', image: 'chemin_image' });
    vue.affiche(contenant);

    const elementsBouteilles = element.querySelectorAll('.bouteille');
    expect(Array.from(elementsBouteilles).map((node) => { return node.src; }))
      .to.eql(['chemin_image', 'chemin_image']);
  });
});
