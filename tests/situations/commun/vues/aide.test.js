import $ from 'jquery';
import EvenementActivationAide from 'commun/modeles/evenement_activation_aide';
import Situation from 'commun/modeles/situation';
import VueAide from 'commun/vues/aide';

describe('vue bouton aide', function () {
  let vue;
  let situation;
  let journal;

  beforeEach(function () {
    $('body').append('<div id="point-insertion"></div>');
    situation = new Situation();
    journal = { situation: 'test', enregistre () { } };
    vue = new VueAide(situation, {}, journal);
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche('#point-insertion', $);
    expect($('#point-insertion .bouton-aide').length).toEqual(1);
  });

  it("au click, active l'aide", function () {
    vue.affiche('#point-insertion', $);
    $('#point-insertion .bouton-aide').click();
    expect(situation.aideActivee).toBe(true);
  });

  it("au click, affiche la fenetre d'aide", function () {
    vue.affiche('#point-insertion', $);
    $('#point-insertion .bouton-aide').click();
    expect($('#point-insertion .fenetre-aide-presentation').length).toEqual(1);
  });

  it("au click, envoit l'événément d'activation d'aide", function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementActivationAide);
      done();
    };
    vue.affiche('#point-insertion', $);
    $('#point-insertion .bouton-aide').click();
  });

  it("envoit l'événément d'activation d'aide une seule fois", function () {
    let compteEnregistrementEvenement = 0;
    journal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementActivationAide);
      compteEnregistrementEvenement++;
    };
    vue.affiche('#point-insertion', $);
    $('#point-insertion .bouton-aide').click();
    $('#point-insertion .bouton-aide').click();
    expect(compteEnregistrementEvenement).toEqual(1);
  });

  it("au click, affiche une seule fois la fenetre d'aide", function () {
    vue.affiche('#point-insertion', $);
    $('#point-insertion .bouton-aide').click();
    $('#point-insertion .bouton-aide').click();
    expect($('#point-insertion .fenetre-aide-presentation').length).toEqual(1);
  });

  it("cache la fenêtre d'aide", function () {
    vue.affiche('#point-insertion', $);
    $('#point-insertion .bouton-aide').click();
    expect($('#point-insertion .fenetre-aide-presentation').length).toEqual(1);
    $('#point-insertion .fenetre-aide-presentation button').click();
    expect($('#point-insertion .fenetre-aide-presentation').length).toEqual(0);
  });
});
