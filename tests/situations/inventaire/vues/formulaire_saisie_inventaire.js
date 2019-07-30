import $ from 'jquery';

import { CHANGEMENT_ETAT, FINI } from 'commun/modeles/situation';
import Contenant from 'inventaire/modeles/contenant';
import { afficheCorrection, initialiseFormulaireSaisieInventaire } from 'inventaire/vues/formulaire_saisie_inventaire';
import EvenementOuvertureSaisieInventaire from 'inventaire/modeles/evenement_ouverture_saisie_inventaire';
import EvenementSaisieInventaire from 'inventaire/modeles/evenement_saisie_inventaire';
import MockDepotRessourcesInventaire from '../aides/mock_depot_ressources';
import { unMagasin, unMagasinVide } from '../aides/magasin';

describe("Le formulaire de saisie d'inventaire", function () {
  let journal;
  let depotRessources;

  beforeEach(function () {
    $('body').append('<div id="magasin"></div>');
    journal = {
      enregistre () {}
    };
    depotRessources = new MockDepotRessourcesInventaire();
  });

  it("sait afficher un bouton pour saisir l'inventaire", function () {
    expect($('.affiche-saisie').length).to.equal(0);
    initialiseFormulaireSaisieInventaire(unMagasinVide(), '#magasin', $, journal, depotRessources);
    expect($('#magasin .affiche-saisie').length).to.equal(1);
  });

  describe('quand on clique sur le bouton', function () {
    beforeEach(function () {
      initialiseFormulaireSaisieInventaire(unMagasinVide(), '#magasin', $, journal, depotRessources);
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

    it("désactive l'auto completion navigateur pour éviter que les réussites précédentes ne soient proposés", function () {
      expect($('.formulaire-saisie-inventaire').attr('autocomplete')).to.equal('off');
    });

    it("journalise l'événement", function (done) {
      journal.enregistre = (evenement) => {
        expect(evenement).to.be.a(EvenementOuvertureSaisieInventaire);
        done();
      };
      $('.affiche-saisie').click();
    });
  });

  describe('quand on clique sur le bouton de retour au stock', function () {
    beforeEach(function () {
      initialiseFormulaireSaisieInventaire(unMagasinVide(), '#magasin', $, journal, depotRessources);
      $('.affiche-saisie').click();
    });

    it('cache le formulaire', function () {
      $('.croix-retour-stock').click();
      expect($('.formulaire-saisie-inventaire.invisible').length).to.equal(1);
    });
  });

  describe("quand on clique sur l'overlay", function () {
    beforeEach(function () {
      initialiseFormulaireSaisieInventaire(unMagasinVide(), '#magasin', $, journal, depotRessources);
      $('.affiche-saisie').click();
      expect($('.overlay.invisible').length).to.equal(0);
    });

    it('cache le formulaire', function () {
      $('.overlay').click();
      expect($('.formulaire-saisie-inventaire.invisible').length).to.equal(1);
    });

    it("cache l'overlay", function () {
      $('.overlay').click();
      expect($('.overlay.invisible').length).to.equal(1);
    });

    it("n'enregistre pas une ouverture de saisie d'inventaire", function () {
      let evenements = 0;
      journal.enregistre = () => {
        evenements++;
      };
      $('.overlay').click();
      expect(evenements).to.eql(0);
    });

    it("ne cache pas l'overlay lorsque l'inventaire est une réussite", function () {
      $('.valide-saisie').click();
      $('.overlay').click();
      expect($('.overlay.invisible').length).to.equal(0);
    });
  });

  it('affiche les images des produits à inventorier', function () {
    let magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Nova Sky', image: 'cheminImageNovaSky' }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 })
    ).construit();

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $, journal, depotRessources);
    expect($('#magasin .formulaire-saisie-inventaire .image-produit').length).to.equal(1);
    expect($('.image-produit img').attr('src')).to.equal('cheminImageNovaSky');
  });

  it('affiche les noms des produits à inventorier', function () {
    let magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Nova Sky' }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 })
    ).construit();

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $, journal, depotRessources);
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

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $, journal, depotRessources);
    expect($('#magasin .formulaire-saisie-inventaire input').length).to.equal(2);
  });

  it("affiche l'unite pour les produits dans des bidons", function () {
    let magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Vrac Sky', forme: 'bidon' },
      { idProduit: '1', nom: 'Terra Cola', forme: 'caisse' }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 }),
      new Contenant({ idContenu: '1', quantite: 7 })
    ).construit();

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $, journal, depotRessources);
    const $champs = $('#magasin .formulaire-saisie-inventaire input');
    expect($champs.eq(0).siblings('.unite').length).to.equal(1);
    expect($champs.eq(1).siblings('.unite').length).to.equal(0);
  });

  it('affiche un bouton pour valider la saisie', function () {
    let magasin = unMagasinVide();
    expect($('.formulaire-saisie-inventaire .valide-saisie').length).to.equal(0);

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $, journal, depotRessources);
    expect($('.formulaire-saisie-inventaire .valide-saisie').length).to.equal(1);
  });

  it('affiche un bouton pour retourner au stock', function () {
    let magasin = unMagasinVide();
    expect($('.formulaire-saisie-inventaire .croix-retour-stock').length).to.equal(0);

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $, journal, depotRessources);
    expect($('.formulaire-saisie-inventaire .croix-retour-stock').length).to.equal(1);
  });

  it("valide la saisie d'inventaire avec succès", function () {
    const magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Nova Sky' }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 })
    ).construit();

    let evenement;

    journal.enregistre = (e) => {
      evenement = e;
    };

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $, journal, depotRessources);
    const $zoneSaisieInventaire = $('.formulaire-saisie-inventaire input');
    const $boutonValidationSaisie = $('.formulaire-saisie-inventaire .valide-saisie');

    $zoneSaisieInventaire.val(12);
    $boutonValidationSaisie.click();
    expect(evenement).to.be.a(EvenementSaisieInventaire);
    expect($('.valide-saisie').length).to.equal(0);
    expect($('.succes-saisie-inventaire').length).to.equal(1);
    expect($('.retour-stock').length).to.equal(0);
    expect(evenement.donnees()).to.eql({ reussite: true, reponses: { '0': { quantite: '12', reussite: true } } });
  });

  it("parse les données rentrées par les utilisateurs pour n'enregistrer que les valeurs numériques", function () {
    const magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Nova Sky' }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 })
    ).construit();

    let evenement;

    journal.enregistre = (e) => {
      evenement = e;
    };

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $, journal, depotRessources);
    const $zoneSaisieInventaire = $('.formulaire-saisie-inventaire input');
    const $boutonValidationSaisie = $('.formulaire-saisie-inventaire .valide-saisie');

    $zoneSaisieInventaire.val('12 L ');
    $boutonValidationSaisie.click();
    expect(evenement.donnees()).to.eql({ reussite: true, reponses: { '0': { quantite: '12', reussite: true } } });
  });

  it("envoie l'événement fin a la réussite", function (done) {
    const magasin = unMagasinVide();

    magasin.on(CHANGEMENT_ETAT, (etat) => {
      expect(etat).to.eql(FINI);
      done();
    });

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $, journal, depotRessources);
    $('.formulaire-saisie-inventaire .valide-saisie').click();
  });

  it("joue l'audio en cas de réussite", function (done) {
    const magasin = unMagasinVide();
    magasin.audios.reussite.play = done;
    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $, journal, depotRessources);
    $('.formulaire-saisie-inventaire .valide-saisie').click();
  });

  it("joue l'audio en cas de erreur", function (done) {
    const magasin = unMagasin().avecCommeReferences(
      { idProduit: '0', nom: 'Nova Sky' }
    ).avecEnStock(
      new Contenant({ idContenu: '0', quantite: 12 })
    ).construit();

    magasin.audios.echec.play = done;

    initialiseFormulaireSaisieInventaire(magasin, '#magasin', $, journal, depotRessources);
    $('.formulaire-saisie-inventaire .valide-saisie').click();
  });

  describe('sait afficher un résultat correcte ou incorrecte', function () {
    beforeEach(function () {
      const magasin = unMagasin().avecCommeReferences(
        { idProduit: '0', nom: 'Nova Sky' }
      ).avecEnStock(
        new Contenant({ idContenu: '0', quantite: 12 })
      ).construit();
      initialiseFormulaireSaisieInventaire(magasin, '#magasin', $, journal, depotRessources);
    });

    it("affiche une marque correcte si c'est correcte", function () {
      expect($('.formulaire-saisie-inventaire .marque-correcte').length).to.equal(0);

      afficheCorrection(['0', true], $);
      expect($('.formulaire-saisie-inventaire .marque-correcte').length).to.equal(1);

      afficheCorrection(['0', false], $);
      expect($('.formulaire-saisie-inventaire .marque-correcte').length).to.equal(0);
    });

    it('style le champ en fonction de la réponse', function () {
      expect($('.formulaire-saisie-inventaire input.reponse-correcte').length).to.equal(0);
      expect($('.formulaire-saisie-inventaire input.reponse-incorrecte').length).to.equal(0);

      afficheCorrection(['0', true], $);
      expect($('.formulaire-saisie-inventaire input.reponse-correcte').length).to.equal(1);
      expect($('.formulaire-saisie-inventaire input.reponse-incorrecte').length).to.equal(0);

      afficheCorrection(['0', false], $);
      expect($('.formulaire-saisie-inventaire input.reponse-correcte').length).to.equal(0);
      expect($('.formulaire-saisie-inventaire input.reponse-incorrecte').length).to.equal(1);
    });
  });
});
