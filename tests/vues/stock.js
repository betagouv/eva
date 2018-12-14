/* global Event */

import { VueStock } from '../../src/vues/stock.js';
import { unContenantVrac } from '../aides/contenant.js';
import jsdom from 'jsdom-global';

describe('vue stock', function () {
  let vue;

  const stock = [
    unContenantVrac('Nova Sky', 1).deCategorie('moyen').aLaPosition(40, 80),
    unContenantVrac('Nova Sky', 2).deCategorie('moyen').aLaPosition(60, 80)
  ];

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    vue = new VueStock({
      contenants: {
        'ContenantVrac': { 'moyen': { largeur: 15, hauteur: 25 }
        }
      }
    });
    vue.init('#magasin');
  });

  it('ajoute plusieurs contenants sur les étagères', function () {
    vue.affiche(stock);

    const etageres = document.getElementById('etageres');
    expect(etageres.tagName).to.equal('IMG');

    etageres.dispatchEvent(new Event('load'));

    const contenantsAjoutes = document.getElementsByClassName('contenant');
    expect(contenantsAjoutes.length).to.equal(2);

    const contenants = document.getElementById('contenants');
    expect(contenants.childNodes[0]).to.eql(contenantsAjoutes[0]);
    expect(contenants.childNodes[1]).to.eql(contenantsAjoutes[1]);
  });

  it('Affiche le contenu quand on clique sur un contenant', function () {
    vue.affiche(stock);

    const etageres = document.getElementById('etageres');
    etageres.dispatchEvent(new Event('load'));

    document.getElementsByClassName('contenant')[0]
      .dispatchEvent(new Event('click'));

    expect(document.getElementById('contenu').classList).to.not.contain('invisible');
  });

  it("crée un point d'insertion pour tous les contenants", function () {
    const element = vue.creerElementContenants({ width: 100, height: 50 });

    expect(element.id).to.equal('contenants');
    expect(element.style.width).to.equal('100px');
    expect(element.style.height).to.equal('50px');
  });

  it("recalcule la taille de contenants quand on redimensionne l'image", function () {
    const dimensionsEtageres = { width: 100, height: 50 };
    const element = vue.creerElementContenants(dimensionsEtageres);

    dimensionsEtageres.width = 50;
    dimensionsEtageres.height = 25;
    window.dispatchEvent(new Event('resize'));
    expect(element.style.width).to.equal('50px');
    expect(element.style.height).to.equal('25px');
  });
});
