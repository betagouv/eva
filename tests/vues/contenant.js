/* global Event */

import { VueContenant } from '../../src/vues/contenant.js';
import { unContenantVrac } from '../aides/contenant.js';
import jsdom from 'jsdom-global';

describe('vue contenant', function () {
  let vue;

  let unModele = unContenantVrac('Nova Sky', 12)
    .aLaPosition(40, 80)
    .deDimension(15, 25);

  beforeEach(function () {
    jsdom('<div id="contenants"></div>');
    const contenants = document.getElementById('contenants');
    vue = new VueContenant(contenants, unModele);
  });

  it('affiche un contenant en fonction du modèle', function () {
    vue.affiche();

    const contenant = document.getElementById('contenants').firstChild;
    expect(contenant.classList.value).to.contain('contenant');
    expect(contenant.getAttribute('style')).to
      .equal('left: ' + 40 + '%;' +
        ' top: ' + 80 + '%;' +
        ' width: ' + 15 + '%;' +
        ' height: ' + 25 + '%;'
      );
  });

  it("affiche le contenu d'un contenant quand on clique dessus", function () {
    let afficheContenu = false;
    vue.affiche(function () {
      afficheContenu = true;
    });

    const contenant = document.getElementsByClassName('contenant')[0];
    contenant.dispatchEvent(new Event('click'));

    expect(afficheContenu).to.be(true);
  });
});
