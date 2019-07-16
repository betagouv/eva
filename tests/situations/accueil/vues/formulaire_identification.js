import jsdom from 'jsdom-global';
import jQuery from 'jquery';
import EventEmitter from 'events';
import { traduction } from 'commun/infra/internationalisation';

import { CHANGEMENT_CONNEXION } from 'commun/modeles/utilisateur';
import FormulaireIdentification from 'accueil/vues/formulaire_identification';

describe("Le formulaire d'identification", function () {
  let $;
  let vue;
  let utilisateur;

  beforeEach(function () {
    jsdom('<div id="formulaire"></div>');
    $ = jQuery(window);
    utilisateur = new class extends EventEmitter {
      estConnecte () {}
      inscris () { return $.Deferred().resolve(); }
      nom () {}
    }();
    vue = new FormulaireIdentification(utilisateur);
  });

  it("s'affiche", function () {
    expect($('#formulaire form').length).to.equal(0);

    vue.affiche('#formulaire', $);
    expect($('#formulaire form#formulaire-identification').length).to.equal(1);
    expect($('#formulaire label').length).to.equal(2);
    expect($('#formulaire input[type=text]').length).to.equal(2);
  });

  it("sauvegarde la valeur rentrée à l'appui sur le bouton", function (done) {
    utilisateur.inscris = (identifiantUtilisateur, codeCampagne) => {
      expect(identifiantUtilisateur).to.equal('Mon pseudo');
      expect(codeCampagne).to.equal('Mon code campagne');
      done();
    };
    vue.affiche('#formulaire', $);
    $('#formulaire #formulaire-identification-input-campagne').val('Mon code campagne');
    $('#formulaire #formulaire-identification-input-nom').val('Mon pseudo').trigger('submit');
  });

  it("réinitialise les valeurs rentrées lorsque l'on a réussi à s'identifier", function () {
    vue.affiche('#formulaire', $);
    $('#formulaire input[type=text]').each(function () {
      $(this).val('Mon pseudo ou code');
    });
    $('#formulaire input[type=text]').trigger('submit');

    $('#formulaire input[type=text]').each(function () {
      expect($(this).val()).to.eql('');
    });
  });

  it("ne réinitialise pas les valeurs rentrées lorsque l'on n'a pas réussi à s'identifier", function () {
    utilisateur.inscris = (identifiantUtilisateur, codeCampagne) => {
      return $.Deferred().reject({ status: 422 });
    };
    vue.affiche('#formulaire', $);
    $('#formulaire input[type=text]').each(function () {
      $(this).val('Mon pseudo ou code');
    });
    $('#formulaire input[type=text]').trigger('submit');
    $('#formulaire input[type=text]').each(function () {
      expect($(this).val()).to.eql('Mon pseudo ou code');
    });
  });

  it('ne sauvegarde pas la valeur rentrée si elle est vide', function () {
    utilisateur.inscris = () => { throw new Error('ne devrait pas être appellé'); };
    vue.affiche('#formulaire', $);
    $('#formulaire input[type=text]').val('').trigger('submit');
  });

  it("cache le formulaire lors que l'évalué·e est connecté·e", function () {
    utilisateur.estConnecte = () => true;
    vue.affiche('#formulaire', $);
    expect($('#formulaire #formulaire-identification').hasClass('invisible')).to.eql(true);
  });

  it("affiche le formulaire lorsque l'évalué·e se connecte", function () {
    utilisateur.estConnecte = () => false;
    vue.affiche('#formulaire', $);
    expect($('#formulaire #formulaire-identification').hasClass('invisible')).to.eql(false);
    utilisateur.estConnecte = () => true;
    utilisateur.emit(CHANGEMENT_CONNEXION);
    expect($('#formulaire #formulaire-identification').hasClass('invisible')).to.eql(true);
  });

  it("affiche une erreur si le code campagne n'existe pas", function () {
    utilisateur.inscris = (identifiantUtilisateur, codeCampagne) => {
      return $.Deferred().reject({ status: 404 });
    };
    vue.affiche('#formulaire', $);
    expect($('.erreur').length).to.equal(0);
    $('#formulaire #formulaire-identification-input-nom').val('Mon pseudo').trigger('submit');
    expect($('.erreur').text()).to.equal(traduction('accueil.identification.erreur_code_campagne'));
  });

  it('affiche une erreur générique', function () {
    utilisateur.inscris = (identifiantUtilisateur, codeCampagne) => {
      return $.Deferred().reject({ status: 422 });
    };
    vue.affiche('#formulaire', $);
    expect($('.erreur').length).to.equal(0);
    $('#formulaire #formulaire-identification-input-nom').val('Mon pseudo').trigger('submit');
    expect($('.erreur').text()).to.equal(traduction('accueil.identification.erreur_generique'));
  });

  it("enlève l'erreur lorsque l'on resoumet le formulaire", function () {
    utilisateur.inscris = (identifiantUtilisateur, codeCampagne) => {
      return $.Deferred().reject({ status: 422 });
    };
    vue.affiche('#formulaire', $);
    expect($('.erreur').length).to.equal(0);
    $('#formulaire #formulaire-identification-input-nom').val('Mon pseudo').trigger('submit');
    expect($('.erreur').length).to.equal(1);
    $('#formulaire #formulaire-identification-input-nom').val('Mon pseudo').trigger('submit');
    expect($('.erreur').length).to.equal(1);
  });
});
