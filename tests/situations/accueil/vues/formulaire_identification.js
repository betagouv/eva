import jsdom from 'jsdom-global';
import jQuery from 'jquery';
import EventEmitter from 'events';

import { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';
import FormulaireIdentification from 'accueil/vues/formulaire_identification';

describe("Le formulaire d'identification", function () {
  let $;
  let vue;
  let registreUtilisateur;

  beforeEach(function () {
    jsdom('<div id="formulaire"></div>');
    $ = jQuery(window);
    registreUtilisateur = new class extends EventEmitter {
      estConnecte () {}
      inscris () {}
      nom () {}
    }();
    vue = new FormulaireIdentification(registreUtilisateur);
  });

  it("s'affiche", function () {
    expect($('#formulaire form').length).to.equal(0);

    vue.affiche('#formulaire', $);
    expect($('#formulaire form#formulaire-identification').length).to.equal(1);
    expect($('#formulaire label').length).to.equal(1);
    expect($('#formulaire input[type=text]').length).to.equal(1);
  });

  it("sauvegarde la valeur rentrée à l'appui sur le bouton", function (done) {
    registreUtilisateur.inscris = (identifiantUtilisateur) => {
      expect(identifiantUtilisateur).to.equal('Mon pseudo');
      done();
    };
    vue.affiche('#formulaire', $);
    $('#formulaire input[type=text]').val('Mon pseudo').trigger('submit');
  });

  it("réinitialise la valeur rentrée à l'appui sur le bouton", function () {
    vue.affiche('#formulaire', $);
    $('#formulaire input[type=text]').val('Mon pseudo').trigger('submit');
    expect($('#formulaire input[type=text]').val()).to.eql('');
  });

  it('ne sauvegarde pas la valeur rentrée si elle est vide', function () {
    registreUtilisateur.inscris = () => { throw new Error('ne devrait pas être appellé'); };
    vue.affiche('#formulaire', $);
    $('#formulaire input[type=text]').val('').trigger('submit');
  });

  it("cache le formulaire lors que l'évalué·e est connecté·e", function () {
    registreUtilisateur.estConnecte = () => true;
    vue.affiche('#formulaire', $);
    expect($('#formulaire #formulaire-identification').hasClass('invisible')).to.eql(true);
  });

  it("affiche le formulaire lorsque l'évalué·e se connecte", function () {
    registreUtilisateur.estConnecte = () => false;
    vue.affiche('#formulaire', $);
    expect($('#formulaire #formulaire-identification').hasClass('invisible')).to.eql(false);
    registreUtilisateur.estConnecte = () => true;
    registreUtilisateur.emit(CHANGEMENT_CONNEXION);
    expect($('#formulaire #formulaire-identification').hasClass('invisible')).to.eql(true);
  });
});
