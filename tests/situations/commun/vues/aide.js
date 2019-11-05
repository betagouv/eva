import $ from 'jquery';
import Situation from 'commun/modeles/situation';
import VueAide from 'commun/vues/aide';

describe('vue bouton aide', function () {
  let vue;
  let situation;

  beforeEach(function () {
    $('body').append('<div id="point-insertion"></div>');
    situation = new Situation();
    vue = new VueAide(situation);
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche('#point-insertion', $);
    expect($('#point-insertion .bouton-aide').length).to.eql(1);
  });

  it("au click, active l'aide", function () {
    vue.affiche('#point-insertion', $);
    $('#point-insertion .bouton-aide').click();
    expect(situation.aideActivee).to.be(true);
  });

  it("au click, affiche la fenetre d'aide", function () {
    vue.affiche('#point-insertion', $);
    $('#point-insertion .bouton-aide').click();
    expect($('#point-insertion .fenetre-aide-presentation').length).to.eql(1);
  });

  it("au click, affiche une seule fois la fenetre d'aide", function () {
    vue.affiche('#point-insertion', $);
    $('#point-insertion .bouton-aide').click();
    $('#point-insertion .bouton-aide').click();
    expect($('#point-insertion .fenetre-aide-presentation').length).to.eql(1);
  });

  it("cache la fenêtre d'aide", function () {
    vue.affiche('#point-insertion', $);
    $('#point-insertion .bouton-aide').click();
    expect($('#point-insertion .fenetre-aide-presentation').length).to.eql(1);
    $('#point-insertion .fenetre-aide-presentation button').click();
    expect($('#point-insertion .fenetre-aide-presentation').length).to.eql(0);
  });
});
