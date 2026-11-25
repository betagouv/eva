import $ from 'jquery';
import VueStop from 'commun/vues/stop';
import Situation, { STOPPEE } from 'commun/modeles/situation';

describe('vue Stop', function () {
  let vue;
  let mockJournal;
  let situation;

  beforeEach(function () {
    $('body').append('<div id="cadre"><div id="point-insertion"></div></div>');
    mockJournal = {
      enregistre () {}
    };
    situation = new Situation();
    vue = new VueStop(situation, mockJournal);
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche('#point-insertion', $);
    expect($('#point-insertion .bouton-stop').length).toEqual(1);
  });

  it('ouvre une fenêtre de confirmation avant de stopper', function () {
    vue.affiche('#point-insertion', $);

    $('#point-insertion .bouton-stop').trigger('click');
    expect($('#fenetre-modale').length).toBe(1);
    expect($('h2').text()).toBe('abandon.confirmation');
  });

  it("n'annonce pas d'impact sur le résultat quand l'abandon n'en a pas", function () {
    situation = new Situation({ abandonImpacteResultat: false });
    vue = new VueStop(situation, mockJournal);
    vue.affiche('#point-insertion', $);

    $('#point-insertion .bouton-stop').trigger('click');
    expect($('h2').text()).toBe('abandon.confirmation_sans_impact');
  });

  it("stoppe la situation quand on confirme la modale", function () {
    vue.clickSurOk();

    expect(situation.etat()).toEqual(STOPPEE);
  });
});
