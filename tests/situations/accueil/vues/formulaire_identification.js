import jsdom from 'jsdom-global';
import FormulaireIdentification from 'accueil/vues/formulaire_identification';

describe("Le formulaire d'identification", function () {
  let $;
  let vue;
  let registreUtilisateur;

  beforeEach(function () {
    jsdom('<div id="formulaire"></div>');
    $ = jQuery(window);
    registreUtilisateur = {
      inscris () {},
      consulte () {}
    };
    vue = new FormulaireIdentification(registreUtilisateur);
  });

  it("s'affiche", function () {
    expect($('#formulaire form').length).to.equal(0);

    vue.affiche('#formulaire', $);
    expect($('#formulaire form#formulaire-identification').length).to.equal(1);
    expect($('#formulaire label').length).to.equal(1);
    expect($('#formulaire input[type=text]').length).to.equal(1);
  });

  it("restaure l'identifiant actuel", function () {
    registreUtilisateur.consulte = () => {
      return 'mon identifiant actuel';
    };
    vue.affiche('#formulaire', $);
    expect($('#formulaire input[type=text]').val()).to.equal('mon identifiant actuel');
  });

  it("affiche une chaîne vide lorsqu'aucun utilisateur n'est identifié", function () {
    registreUtilisateur.consulte = () => {
      return null;
    };
    vue.affiche('#formulaire', $);
    expect($('#formulaire input[type=text]').val()).to.equal('');
  });

  it('sauvegarde la valeur rentrée', function (done) {
    registreUtilisateur.inscris = (identifiantUtilisateur) => {
      expect(identifiantUtilisateur).to.equal('Mon pseudo');
      done();
    };
    vue.affiche('#formulaire', $);
    $('#formulaire input[type=text]').val('Mon pseudo').trigger('input');
  });
});
