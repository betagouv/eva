import { VueContenuUnitaire } from '../../src/vues/contenu_unitaire.js';
import { unContenantUnitaire } from '../aides/contenant.js';
import jsdom from 'jsdom-global';

describe('vue contenu unitaire', function () {
  let vue;
  let element;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    let pointInsertion = document.getElementById('magasin');
    vue = new VueContenuUnitaire(pointInsertion);
    element = document.getElementById('contenu-unitaire');
  });

  it('affiche un contenu unitaire', function () {
    vue.affiche(unContenantUnitaire('Nova Sky', 1));

    expect(element.classList).to.not.contain('invisible');
    expect(element.querySelector(':first-child').classList).to.contain('caisse');
  });
});
