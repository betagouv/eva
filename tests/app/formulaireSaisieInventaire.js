import { unContenantUnitaire } from '../aides/contenant.js';
import { unMagasin, unMagasinVide } from '../aides/magasin.js';
import { initialiseFormulaireSaisieInventaire } from '../../src/app/formulaireSaisieInventaire.js';

let jsdom = require('jsdom-global');

describe("Le formulaire de saisie d'inventaire", function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    $ = jQuery(window);
  });

  it("s'affiche quand on clique sur le bouton", function () {
    initialiseFormulaireSaisieInventaire(unMagasinVide(), '#magasin', $);
    expect($('#magasin .affiche-saisie').length).to.equal(1);
    expect($('.formulaire-saisie-inventaire.visible').length).to.equal(0);

    $('.affiche-saisie').click();
    expect($('.formulaire-saisie-inventaire.visible').length).to.equal(1);
  });

  it('affiche les noms des produits à inventorier', function () {
    let magasin = unMagasin().avecEnStock(
      unContenantUnitaire('Nova Sky', 12)
    ).construit();

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $);
    expect($('#magasin .formulaire-saisie-inventaire li').length).to.equal(1);
    expect($('#magasin .formulaire-saisie-inventaire li').text()).to.equal('Nova Sky');
  });
});
