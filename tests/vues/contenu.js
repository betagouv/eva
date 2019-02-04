/* global Event */

import { Contenant } from '../../src/modeles/contenant.js';
import { VueContenu } from '../../src/vues/contenu.js';
import jsdom from 'jsdom-global';

describe('vue contenu', function () {
  let vue;
  let calque;

  beforeEach(function () {
    jsdom('<div id="stock"></div>');
    let pointInsertion = document.getElementById('stock');
    vue = new VueContenu(pointInsertion, 'id', { hauteur: 25, largeur: 45 });
    calque = document.getElementById('id');
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
    }, 200);
  });

  it("calcule la position du contenant ouvert pour qu'il soit centré sur le contenant fermé", function () {
    expect(vue.position(50, 2, 4)).to.equal(49);
  });
});
