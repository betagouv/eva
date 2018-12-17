/* global Event */

import { VueContenu } from '../../src/vues/contenu.js';
import { unContenantVrac } from '../aides/contenant.js';
import jsdom from 'jsdom-global';

describe('vue contenu', function () {
  let vue;
  let pointInsertion;

  beforeEach(function () {
    jsdom('<div id="stock"></div>');
    pointInsertion = document.getElementById('stock');
    vue = new VueContenu(pointInsertion);
  });

  it("initialise un contenu invisible tant que le contenant n'est pas ouvert", function () {
    const element = document.getElementById('contenu');
    expect(element.classList).to.contain('invisible');
  });

  it('sait se cacher', function () {
    vue.affiche(unContenantVrac('Nova Sky', 1));
    const element = document.getElementById('contenu');
    element.dispatchEvent(new Event('click'));

    expect(element.classList).to.contain('invisible');
  });

  it('affiche un contenu en vrac', function () {
    vue.affiche(unContenantVrac('Nova Sky', 1));

    const element = document.getElementById('contenu');
    expect(element.classList).to.not.contain('invisible');

    const etiquette = element.querySelector('.etiquette');
    expect(etiquette.querySelector('#nom').textContent).to.equal('Nova Sky');
    expect(etiquette.querySelector('#quantite').textContent).to.equal('1');
    expect(etiquette.querySelector('#unite').textContent).to.equal('litre');
  });

  it('affiche un contenu en vrac de plusieurs litres', function () {
    vue.affiche(unContenantVrac('Nova Sky', 2));

    const element = document.getElementById('contenu');
    expect(element.querySelector('#quantite').textContent).to.equal('2');
    expect(element.querySelector('#unite').textContent).to.equal('litres');
  });
});
