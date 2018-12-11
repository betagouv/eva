import { VueContenuVrac } from '../../src/vues/contenu_vrac.js';
import { unContenantVrac } from '../aides/contenant.js';
import jsdom from 'jsdom-global';

describe('vue contenu vrac', function () {
  let vue;
  let element;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    let pointInsertion = document.getElementById('magasin');
    vue = new VueContenuVrac(pointInsertion);
    element = document.getElementById('contenu-vrac');
  });

  it('affiche un contenu en vrac', function () {
    vue.affiche(unContenantVrac('Nova Sky', 1));

    expect(element.classList).to.not.contain('invisible');
    expect(element.querySelector(':first-child').classList).to.contain('etiquette');

    expect(element.querySelector('#nom').textContent).to.equal('Nova Sky');
    expect(element.querySelector('#quantite').textContent).to.equal('1');
    expect(element.querySelector('#unite').textContent).to.equal('litre');
  });

  it('affiche un contenu en vrac de plusieurs litres', function () {
    vue.affiche(unContenantVrac('Nova Sky', 2));

    const etiquette = element.querySelector('.etiquette');
    expect(etiquette.querySelector('#quantite').textContent).to.equal('2');
    expect(etiquette.querySelector('#unite').textContent).to.equal('litres');
  });
});
