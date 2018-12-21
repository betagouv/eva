/* global Event */

import { VueEtageres } from '../../src/vues/etageres.js';
import { unContenantVrac } from '../aides/contenant.js';
import { MockJournal } from '../aides/mockJournal.js';
import jsdom from 'jsdom-global';

describe('vue etagères', function () {
  let vue;

  const stock = [
    unContenantVrac('Nova Sky', 1).deCategorie('moyen').aLaPosition(40, 80),
    unContenantVrac('Nova Sky', 2).deCategorie('moyen').aLaPosition(60, 80)
  ];

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    vue = new VueEtageres('#magasin', new MockJournal());
  });

  it('ajoute plusieurs contenants sur les étagères', function () {
    vue.affiche(stock);

    const etageres = document.getElementById('imageEtageres');
    expect(etageres.tagName).to.equal('IMG');

    etageres.dispatchEvent(new Event('load'));

    const contenantsAjoutes = document.getElementsByClassName('contenant');
    expect(contenantsAjoutes.length).to.equal(2);
  });
});
