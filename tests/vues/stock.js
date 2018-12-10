/* global Event */

import { uneVueStock } from '../../src/vues/stock.js';
import { unContenantVrac } from '../aides/contenant.js';
import jsdom from 'jsdom-global';

describe('vue stock', function () {
  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
  });

  it('ajoute plusieurs contenants sur les étagères', function () {
    let stock = [
      unContenantVrac('Nova Sky', 1).deCategorie('moyen').aLaPosition(40, 80),
      unContenantVrac('Nova Sky', 2).deCategorie('moyen').aLaPosition(60, 80)
    ];

    const vue = uneVueStock({
      contenants: {
        'ContenantVrac': { 'moyen': { largeur: 15, hauteur: 25 }
        }
      }
    });
    vue.init('#magasin');
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

  it("recalcule la position des contenants si l'image est redimentionnée", function () {
    let stock = [
      unContenantVrac('Nova Sky', 12).deCategorie('moyen').aLaPosition(40, 80)
    ];

    const vue = uneVueStock({
      contenants: {
        'ContenantVrac': { 'moyen': { largeur: 15, hauteur: 25 }
        }
      }
    });
    vue.init('#magasin');
    vue.affiche(stock);

    const etageres = document.getElementById('etageres');
    etageres.dispatchEvent(new Event('load'));
    window.dispatchEvent(new Event('resize'));

    expect(document.getElementsByClassName('contenant').length).to.equal(1);
  });

  describe('sait afficher ou masquer le contenu', function () {
    beforeEach(function () {
      let stock = [
        unContenantVrac('Nova Sky', 12).deCategorie('moyen').aLaPosition(40, 80)
      ];

      const vue = uneVueStock({
        contenants: {
          'ContenantVrac': { 'moyen': { largeur: 15, hauteur: 25 }
          }
        }
      });
      vue.init('magasin');
      vue.affiche(stock);

      const etageres = document.getElementById('etageres');
      etageres.dispatchEvent(new Event('load'));
    });

    it('Affiche le contenu quand on clique sur un contenant', function () {
      document.getElementsByClassName('contenant')[0]
        .dispatchEvent(new Event('click'));

      expect(document.getElementsByClassName('visible').length).to.equal(1);
    });

    it('Masque le contenu si on clique sur le fond', function () {
      document.getElementsByClassName('contenant')[0]
        .dispatchEvent(new Event('click'));
      document.body.dispatchEvent(new Event('click'));

      expect(document.getElementsByClassName('visible').length).to.equal(0);
    });

    it('Masque le contenu si on clique sur un contenant alors que le contenu des déjà visible', function () {
      const contenant = document.getElementsByClassName('contenant')[0];
      contenant.dispatchEvent(new Event('click'));
      contenant.dispatchEvent(new Event('click'));

      expect(document.getElementsByClassName('visible').length).to.equal(0);
    });
  });
});
