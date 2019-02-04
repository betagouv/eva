/* global Event */

import { VueContenu } from '../../src/vues/contenu.js';
import { unContenantVrac } from '../aides/contenant.js';
import jsdom from 'jsdom-global';

describe('vue contenu', function () {
  let vue;
  let calque;

  beforeEach(function () {
    jsdom('<div id="stock"></div>');
    let pointInsertion = document.getElementById('stock');
    vue = new VueContenu(pointInsertion, 'id', { hauteur: 10, largeur: 10 });
    calque = document.getElementById('id');
  });

  it("initialise un contenu invisible tant que le contenant n'est pas ouvert", function () {
    expect(calque.classList).to.contain('invisible');
  });

  it('sait se cacher', function (done) {
    vue.affiche(unContenantVrac('Nova Sky', 1));
    calque.dispatchEvent(new Event('click'));

    setTimeout(() => {
      expect(calque.classList).to.contain('invisible');
      done();
    }, 200);
  });

  it("calcule la position du contenant ouvert pour qu'il soit centré sur le contenant fermé", function () {
    expect(vue.position(10, 20, 30)).to.equal(5);
  });
});
