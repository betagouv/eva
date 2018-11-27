import { unContenantUnitaire } from '../aides/contenant.js';
import { unMagasin, unMagasinVide } from '../aides/magasin.js';
import { initialiseFormulaireSaisieInventaire } from '../../src/vues/formulaireSaisieInventaire.js';

let jsdom = require('jsdom-global');

describe("Le formulaire de saisie d'inventaire", function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    $ = jQuery(window);
  });

  describe('quand on clique sur le bouton', function () {
    beforeEach(function () {
      initialiseFormulaireSaisieInventaire(unMagasinVide(), '#magasin', $);
      expect($('#magasin .affiche-saisie').length).to.equal(1);
    });

    it('affiche un overlay extérieur pour commander sa fermeture', function () {
      expect($('.overlay.invisible').length).to.equal(1);

      $('.affiche-saisie').click();
      expect($('.overlay.invisible').length).to.equal(0);
    });

    it("s'affiche", function () {
      expect($('.formulaire-saisie-inventaire.invisible').length).to.equal(1);

      $('.affiche-saisie').click();
      expect($('.formulaire-saisie-inventaire.invisible').length).to.equal(0);
    });
  });

  describe("quand on clique sur l'overlay", function () {
    beforeEach(function () {
      initialiseFormulaireSaisieInventaire(unMagasinVide(), '#magasin', $);
      $('.affiche-saisie').click();
      expect($('.overlay.invisible').length).to.equal(0);
    });

    it('efface le formulaire', function () {
      $('.overlay').click();
      expect($('.formulaire-saisie-inventaire.invisible').length).to.equal(1);
    });

    it("s'efface (l'overlay)", function () {
      $('.overlay').click();
      expect($('.overlay.invisible').length).to.equal(1);
    });
  });

  it('affiche les noms des produits à inventorier', function () {
    let magasin = unMagasin().avecEnStock(
      unContenantUnitaire('Nova Sky', 12)
    ).construit();

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $);
    expect($('#magasin .formulaire-saisie-inventaire label').length).to.equal(1);
    expect($('#magasin .formulaire-saisie-inventaire label').text()).to.equal('Nova Sky');
  });

  it('affiche pour chaque produit une zone de saisie', function () {
    let magasin = unMagasin().avecEnStock(
      unContenantUnitaire('Nova Sky', 12),
      unContenantUnitaire('Terra Cola', 7)
    ).construit();

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $);
    expect($('#magasin .formulaire-saisie-inventaire input').length).to.equal(2);
  });
});
