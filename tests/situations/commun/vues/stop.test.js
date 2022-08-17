import $ from 'jquery';
import VueStop from 'commun/vues/stop';
import EvenementAbandon from 'commun/modeles/evenement_abandon';
import Situation, { STOPPEE } from 'commun/modeles/situation';

describe('vue Stop', function () {
  let vue;
  let retourAccueil = false;
  let mockJournal;
  let situation;

  beforeEach(function () {
    $('body').append('<div id="cadre"><div id="point-insertion"></div></div>');
    mockJournal = {
      enregistre () {}
    };
    situation = new Situation();
    vue = new VueStop(situation, mockJournal, () => {
      retourAccueil = true;
    });
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche('#point-insertion', $);
    expect($('#point-insertion .bouton-stop').length).toEqual(1);
  });

  it('ouvre une fenêtre de confirmation avant de stopper', function () {
    vue.affiche('#point-insertion', $);

    $('#point-insertion .bouton-stop').trigger('click');
    expect($('#fenetre-modale').length).toBe(1);
    expect($('h2').text()).toBe('situation.stop');
  });

  it("enregistre l'événement et redirige vers l'accueil quand on confirme la modale", function () {
    mockJournal.enregistre = (evenement) => {
      expect(evenement).toBeInstanceOf(EvenementAbandon);
      return Promise.resolve();
    };
    return vue.clickSurOk().then(() => {
      expect(situation.etat()).toEqual(STOPPEE);
      expect(retourAccueil).toBe(true);
    });
  });

  it("Redirige vers l'accueil même si l'enregistrement échoue", function (done) {
    retourAccueil = false;
    mockJournal.enregistre = () => {
      return Promise.reject(new Error('serveur non joignable'));
    };
    vue.clickSurOk().catch(() => {
      try {
        expect(retourAccueil).toBe(true);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
