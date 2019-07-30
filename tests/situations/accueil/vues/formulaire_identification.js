import $ from 'jquery';
import EventEmitter from 'events';
import { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';
import FormulaireIdentification from 'accueil/vues/formulaire_identification';

describe("Le formulaire d'identification", function () {
  let vue;
  let registreUtilisateur;

  beforeEach(function () {
    $('body').append('<div id="formulaire"></div>');
    registreUtilisateur = new class extends EventEmitter {
      estConnecte () {}
      inscris () { return $.Deferred().resolve(); }
      nom () {}
    }();
    vue = new FormulaireIdentification(registreUtilisateur);
  });

  it("s'affiche", function () {
    expect($('#formulaire form').length).to.equal(0);

    vue.affiche('#formulaire', $);
    expect($('#formulaire form#formulaire-identification').length).to.equal(1);
    expect($('#formulaire label').length).to.equal(2);
    expect($('#formulaire input[type=text]').length).to.equal(2);
  });

  it("sauvegarde la valeur rentrée à l'appui sur le bouton", function (done) {
    registreUtilisateur.inscris = (identifiantUtilisateur, codeCampagne) => {
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
    registreUtilisateur.inscris = (identifiantUtilisateur, codeCampagne) => {
      return $.Deferred().reject({ responseJSON: { campagne: 'code inexistant' } });
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

  it('affiche les erreurs si les champs sont vides', function () {
    registreUtilisateur.inscris = (identifiantUtilisateur, codeCampagne) => {
      return $.Deferred().reject({ responseJSON: { campagne: 'code inexistant', nom: 'doit être rempli' } });
    };
    vue.affiche('#formulaire', $);
    expect($('.erreur').length).to.equal(0);
    $('#formulaire #formulaire-identification-input-nom').val('Mon pseudo').trigger('submit');
    expect($('.erreur').length).to.equal(2);
    expect($('.erreur:first').text()).to.equal('doit être rempli');
    expect($('.erreur:last').text()).to.equal('code inexistant');
  });

  it("enlève l'erreur lorsque l'on resoumet le formulaire", function () {
    registreUtilisateur.inscris = (identifiantUtilisateur, codeCampagne) => {
      return $.Deferred().reject({ responseJSON: { campagne: 'code inexistant' } });
    };
    vue.affiche('#formulaire', $);
    expect($('.erreur').length).to.equal(0);
    $('#formulaire #formulaire-identification-input-nom').val('Mon pseudo').trigger('submit');
    expect($('.erreur').length).to.equal(1);
    $('#formulaire #formulaire-identification-input-nom').val('Mon pseudo').trigger('submit');
    expect($('.erreur').length).to.equal(1);
  });
});
