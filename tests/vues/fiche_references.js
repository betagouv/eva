import { VueFicheReferences } from '../../src/vues/fiche_references.js';
import jsdom from 'jsdom-global';

describe('vue fiche références produits', function () {
  let vue;
  let pointInsertion;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    vue = new VueFicheReferences('#magasin');
    pointInsertion = document.querySelector('#magasin');
  });

  it("sait s'afficher dans une page web", function () {
    vue.affiche();

    const element = pointInsertion.querySelector(':first-child');
    expect(element.classList).to.contain('fiche-references');
    expect(element.src).to.equal('images/fiche_references.png');
  });
});
