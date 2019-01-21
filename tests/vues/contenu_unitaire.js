import { VueContenuUnitaire } from '../../src/vues/contenu_unitaire.js';
import { unContenantUnitaire } from '../aides/contenant.js';
import jsdom from 'jsdom-global';

describe('vue contenu unitaire', function () {
  let vue;
  let element;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    let pointInsertion = document.getElementById('magasin');
    vue = new VueContenuUnitaire(pointInsertion);
    element = document.getElementById('contenu-unitaire');
  });

  it("sait s'afficher dans une page web", function () {
    vue.affiche(unContenantUnitaire('Nova Sky', 1));

    expect(element.classList).to.not.contain('invisible');
    expect(element.querySelector(':first-child').classList).to.contain('caisse');
  });

  it("sait afficher plusieurs bouteilles d'un certain type", function () {
    vue.affiche(unContenantUnitaire('Nova Sky', 2));

    const elementsBouteilles = element.querySelectorAll('.bouteille');
    expect(Array.from(elementsBouteilles).map((node) => { return node.src; }))
      .to.eql(['images/novasky.png', 'images/novasky.png']);
  });
});
