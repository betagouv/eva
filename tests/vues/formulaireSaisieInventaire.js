import { Contenant } from '../../src/modeles/contenant.js';
import { unMagasin, unMagasinVide } from '../aides/magasin.js';
import { afficheCorrection, initialiseFormulaireSaisieInventaire } from '../../src/vues/formulaireSaisieInventaire.js';

let jsdom = require('jsdom-global');

describe("Le formulaire de saisie d'inventaire", function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    $ = jQuery(window);
  });

  it("sait afficher un bouton pour saisir l'inventaire", function () {
    expect($('.affiche-saisie').length).to.equal(0);
    initialiseFormulaireSaisieInventaire(unMagasinVide(), '#magasin', $);
    expect($('#magasin .affiche-saisie').length).to.equal(1);
  });

  describe('quand on clique sur le bouton', function () {
    beforeEach(function () {
      initialiseFormulaireSaisieInventaire(unMagasinVide(), '#magasin', $);
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

  it('affiche les images des produits à inventorier', function () {
    let magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Nova Sky', image: 'cheminImageNovaSky' }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 })
    ).construit();

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $);
    expect($('#magasin .formulaire-saisie-inventaire .image-produit').length).to.equal(1);
    expect($('.image-produit').css('background-image')).to.equal('url(cheminImageNovaSky)');
  });

  it('affiche les noms des produits à inventorier', function () {
    let magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Nova Sky' }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 })
    ).construit();

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $);
    expect($('#magasin .formulaire-saisie-inventaire label').length).to.equal(1);
    expect($('#magasin .formulaire-saisie-inventaire label').text()).to.equal('Nova Sky');
  });

  it('affiche pour chaque produit une zone de saisie', function () {
    let magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Nova Sky' },
      { idProduit: '1', nom: 'Terra Cola' }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 }),
      new Contenant({ idContenu: '1', quantite: 7 })
    ).construit();

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $);
    expect($('#magasin .formulaire-saisie-inventaire input').length).to.equal(2);
  });

  it('affiche un bouton pour valider la saisie', function () {
    let magasin = unMagasinVide();
    expect($('#magasin .formulaire-saisie-inventaire .valide-saisie').length).to.equal(0);

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $);
    expect($('#magasin .formulaire-saisie-inventaire .valide-saisie').length).to.equal(1);
  });

  it("valide la saisie d'inventaire avec succès", function (done) {
    let magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Nova Sky' }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 })
    ).construit();

    let verifieValidite = function (saisieValide) {
      expect(Array.from(saisieValide)).to.eql([
        ['0', true]
      ]);
      done();
    };

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $, verifieValidite);
    let $zoneSaisieInventaire = $('.formulaire-saisie-inventaire input');
    let $boutonValidationSaisie = $('.formulaire-saisie-inventaire .valide-saisie');

    $zoneSaisieInventaire.val(12);
    $boutonValidationSaisie.click();
  });

  it('sait afficher une maque correcte ou incorrecte', function () {
    let magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Nova Sky' }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 })
    ).construit();
    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $, () => {});
    expect($('.formulaire-saisie-inventaire span.reponse-correcte').length).to.equal(0);
    expect($('.formulaire-saisie-inventaire span.reponse-incorrecte').length).to.equal(0);

    afficheCorrection(['0', true], $);
    expect($('.formulaire-saisie-inventaire span.reponse-correcte').length).to.equal(1);
    expect($('.formulaire-saisie-inventaire span.reponse-incorrecte').length).to.equal(0);

    afficheCorrection(['0', false], $);
    expect($('.formulaire-saisie-inventaire span.reponse-correcte').length).to.equal(0);
    expect($('.formulaire-saisie-inventaire span.reponse-incorrecte').length).to.equal(1);
  });
});
