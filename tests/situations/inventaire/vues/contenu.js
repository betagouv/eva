/* global Event */

import { Contenant } from 'inventaire/modeles/contenant.js';
import { DELAY_FERMETURE_CONTENANT_MILLISEC, VueContenu } from 'inventaire/vues/contenu.js';
import jsdom from 'jsdom-global';

describe('vue contenu', function () {
  let vue;
  let calque;
  let element;

  beforeEach(function () {
    jsdom('<div id="stock"></div>');
    let pointInsertion = document.getElementById('stock');
    vue = new VueContenu(pointInsertion);
    calque = document.getElementById('calque');
    element = vue.element;
  });

  it("initialise un contenu invisible tant que le contenant n'est pas ouvert", function () {
    expect(calque.classList).to.contain('invisible');
  });

  it("sait s'afficher puis se cacher", function (done) {
    const contenant = new Contenant({ idProduit: '0', quantite: 1, dimensionsOuvert: { largeur: 33, hauteur: 33 } });
    vue.affiche(contenant);
    vue.element.dispatchEvent(new Event('load'));

    expect(calque.classList).to.not.contain('invisible');

    calque.dispatchEvent(new Event('click'));

    setTimeout(() => {
      expect(calque.classList).to.contain('invisible');
      done();
    }, DELAY_FERMETURE_CONTENANT_MILLISEC);
  });

  describe('position()', function () {
    it("calcule la position du contenant ouvert pour qu'il soit centré sur le contenant fermé", function () {
      expect(vue.position(50, 2, 4)).to.equal(49);
    });
  });

  describe('affiche()', function () {
    it("sait afficher l'image du contenant ouvert", function () {
      const contenant = new Contenant({ imageOuvert: 'image_contenant', dimensionsOuvert: { largeur: 33, hauteur: 33 } }, { nom: 'Nova Sky' });
      vue.affiche(contenant);
      vue.element.dispatchEvent(new Event('load'));

      expect(element.src).to.eql('image_contenant');
    });

    it('affiche le contenant ouvert aux dimensions données en paramètres', function () {
      const contenant = new Contenant({ dimensionsOuvert: { largeur: 30, hauteur: 20 } });

      vue.affiche(contenant);

      expect(vue.element.style.width).to.eql('30%');
      expect(vue.element.style.height).to.eql('20%');
    });
  });
});
