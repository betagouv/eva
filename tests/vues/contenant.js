/* global Event */

import { VueContenant } from '../../src/vues/contenant.js';
import { unContenantVrac } from '../aides/contenant.js';
import jsdom from 'jsdom-global';

describe('vue contenant', function () {
  let vue;

  let unModele = unContenantVrac('Nova Sky', 12)
    .deCategorie('moyen')
    .aLaPosition(40, 80);

  let uneTopologie = {
    contenants: {
      'ContenantVrac': { 'moyen': { largeur: 15, hauteur: 25 }
      }
    }
  };

  beforeEach(function () {
    jsdom('<div id="stock"></div>');
    const stock = document.getElementById('stock');
    vue = new VueContenant(uneTopologie);
    vue.init(stock);
  });

  it('crée un contenant en fonction de la taille des étagères', function () {
    vue.afficheUnContenant(
      unModele,
      { width: 1400, height: 1000 }
    );

    const contenant = document.getElementById('contenants').firstChild;
    expect(contenant.classList.value).to.contain('contenant');
    expect(contenant.getAttribute('style')).to
      .equal('left: ' + 1400 * 40 / 100 + 'px;' +
        ' top: ' + 1000 * 80 / 100 + 'px;' +
        ' height: ' + 1000 * 25 / 100 + 'px;' +
        ' width: ' + 1400 * 15 / 100 + 'px;'
      );
  });

  it("affiche le contenu d'un contenant quand on clique dessus", function () {
    let afficheContenu = false;
    vue.afficheUnContenant(unModele, { width: 1400, height: 1000 },
      function () {
        afficheContenu = true;
      });

    const contenant = document.getElementsByClassName('contenant')[0];
    contenant.dispatchEvent(new Event('click'));

    expect(afficheContenu).to.be(true);
  });
});
