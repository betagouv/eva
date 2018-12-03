import { uneVueContenant } from '../../src/vues/contenant.js';
import { unContenantVrac } from '../aides/contenant.js';
import jsdom from 'jsdom-global';

describe('vue contenant', function () {
  beforeEach(function () {
    jsdom();
  });

  it('crée un contenant en fonction de la taille des étagères', function () {
    const contenant = uneVueContenant({
      contenants: {
        'ContenantVrac': { 'moyen': { largeur: 15, hauteur: 25 }
        }
      }
    }).createElement(
      unContenantVrac('Nova Sky', 12).deCategorie('moyen').aLaPosition(40, 80),
      { width: 1400, height: 1000 }
    );

    expect(contenant.classList.value).to.contain('contenant');
    expect(contenant.getAttribute('style')).to
      .equal('left: ' + 1400 * 40 / 100 + 'px;' +
        ' top: ' + 1000 * 80 / 100 + 'px;' +
        ' height: ' + 1000 * 25 / 100 + 'px;' +
        ' width: ' + 1400 * 15 / 100 + 'px;'
      );
  });
});
