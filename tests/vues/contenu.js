/* global Event */

import { VueContenu } from '../../src/vues/contenu.js';
import { unContenantVrac } from '../aides/contenant.js';
import jsdom from 'jsdom-global';

describe('vue contenu', function () {
  let vue;
  let element;

  beforeEach(function () {
    jsdom('<div id="stock"></div>');
    let pointInsertion = document.getElementById('stock');
    vue = new VueContenu(pointInsertion);
    element = document.getElementById('contenu');
  });

  it("initialise un contenu invisible tant que le contenant n'est pas ouvert", function () {
    expect(element.classList).to.contain('invisible');
  });

  it('sait se cacher', function () {
    vue.affiche(unContenantVrac('Nova Sky', 1));
    element.dispatchEvent(new Event('click'));

    expect(element.classList).to.contain('invisible');
  });
});
