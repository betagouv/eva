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

  it('sait se cacher', function (done) {
    const contenant = new Contenant({ idProduit: '0', quantite: 1 });
    vue.affiche(contenant);
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

    it('ne peut pas dépasser de la scène par le haut ou la gauche', function () {
      expect(vue.position(0, 2, 50)).to.equal(0);
    });

    it('ne peut pas dépasser de la scène par le bas ou la droite', function () {
      expect(vue.position(95, 2, 30)).to.equal(70);
    });
  });

  describe('affiche()', function () {
    it("sait afficher l'image du contenant", function () {
      const contenant = new Contenant({ image: 'image_contenant' }, { nom: 'Nova Sky' });
      vue.affiche(contenant);

      expect(calque.classList).to.not.contain('invisible');
      expect(element.src).to.eql('image_contenant');
    });

    it("calcule la hauteur du contenant ouvert en fonction de ses dimensions d'origine et de la scène", function () {
      const contenant = new Contenant({ dimensionsOuvertes: { largeur: 4, hauteur: 6 } });

      vue.dimensions = { largeur: 8 };
      vue.affiche(contenant);

      expect(vue.element.style.height).to.eql('16%');
    });
  });

});
