/* global Event */

import { VueContenu } from '../../src/vues/contenu.js';
import { unContenantVrac } from '../aides/contenant.js';
import jsdom from 'jsdom-global';

describe('vue contenu', function () {
  let vue;

  beforeEach(function () {
    jsdom('<div id="stock"></div>');
    vue = new VueContenu();
    vue.init('stock');
  });

  function checkVisibilite (expectVisible, contenu) {
    const classes = contenu.classList.value.split(' ');
    if (expectVisible) {
      expect(classes).to.not.contain('invisible');
      expect(classes).to.contain('visible');
    } else {
      expect(classes).to.not.contain('visible');
      expect(classes).to.contain('invisible');
    }
  }

  it("initialise un contenu invisible tant que le contenant n'est pas ouvert", function () {
    const element = document.getElementById('contenu');
    expect(element.classList.value).to.contain('invisible');
  });

  it("re-initialise l'element du dom si on refait l'initalisation de la vue", function () {
    const element = document.getElementById('contenu');
    vue.init('stock');

    const nouvelElement = document.getElementById('contenu');
    expect(nouvelElement).to.not.equal(element);
  });

  it('affiche un contenu en vrac', function () {
    vue.affiche(unContenantVrac('Nova Sky', 1));

    const element = document.getElementById('contenu');
    checkVisibilite(true, element);

    expect(element.querySelector('#nom').textContent).to.equal('Nova Sky');
    expect(element.querySelector('#quantite').textContent).to.equal('1');
    expect(element.querySelector('#unite').textContent).to.equal('litre');
  });

  it("recache le contenu quand on clique n'importe où", function () {
    vue.affiche(unContenantVrac('Nova Sky', 1));

    document.body.dispatchEvent(new Event('click'));

    const element = document.getElementById('contenu');
    checkVisibilite(false, element);
  });

  it('affiche un contenu en vrac de plusieurs litres', function () {
    vue.affiche(unContenantVrac('Nova Sky', 2));

    const element = document.getElementById('contenu');
    expect(element.querySelector('#quantite').textContent).to.equal('2');
    expect(element.querySelector('#unite').textContent).to.equal('litres');
  });
});
