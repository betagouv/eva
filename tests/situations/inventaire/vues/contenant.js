/* global Event */

import { Contenant } from 'inventaire/modeles/contenant.js';
import { VueContenant } from 'inventaire/vues/contenant.js';
import jsdom from 'jsdom-global';

describe('vue contenant', function () {
  let vue;

  let contenant = new Contenant(
    { quantite: 12, posX: 40, posY: 80, largeur: 15, hauteur: 25 }
  );

  beforeEach(function () {
    jsdom('<div id="contenants"></div>');
    const pointInsertion = document.getElementById('contenants');
    vue = new VueContenant(pointInsertion, contenant);
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

  it("affiche le contenu d'un contenant quand on clique dessus", function (done) {
    vue.affiche(function () {
      done();
    });

    const contenant = document.getElementsByClassName('contenant')[0];
    contenant.dispatchEvent(new Event('click'));
  });
});
