import { Contenant } from '../../src/modeles/contenant.js';
import { VueContenuVrac } from '../../src/vues/contenu_vrac.js';
import jsdom from 'jsdom-global';

describe('vue contenu vrac', function () {
  let vue;
  let element;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    let pointInsertion = document.getElementById('magasin');
    vue = new VueContenuVrac(pointInsertion);
    element = document.getElementById('contenu-vrac');
    vue.element.animate = () => {};
  });

  it('affiche un contenu en vrac', function () {
    const contenant = new Contenant({ quantite: 1 }, { nom: 'Nova Sky' });
    vue.affiche(contenant);

    expect(element.classList).to.not.contain('invisible');
    expect(element.querySelector(':first-child').classList).to.contain('etiquette');

    expect(element.querySelector('#nom').textContent).to.equal('Nova Sky');
    expect(element.querySelector('#quantite').textContent).to.equal('1');
    expect(element.querySelector('#unite').textContent).to.equal('litre');
  });

  it('affiche un contenu en vrac de plusieurs litres', function () {
    const contenant = new Contenant({ quantite: 2 }, { nom: 'Nova Sky' });
    vue.affiche(contenant);

    const etiquette = element.querySelector('.etiquette');
    expect(etiquette.querySelector('#quantite').textContent).to.equal('2');
    expect(etiquette.querySelector('#unite').textContent).to.equal('litres');
  });
});
