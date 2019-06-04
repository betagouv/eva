import jsdom from 'jsdom-global';
import jQuery from 'jquery';
import VueStop from 'commun/vues/stop';
import EvenementStop from 'commun/modeles/evenement_stop';
import Situation, { STOPPEE } from 'commun/modeles/situation';
import { initialise } from '../aides/internationalisation';

beforeEach(() => initialise());

describe('vue Stop', function () {
  let vue;
  let $;
  let retourAccueil = false;
  let mockJournal;
  let situation;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
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
    expect(document.querySelector('#point-insertion .bouton-stop').classList).to.not.contain('invisible');
  });

  it('ouvre une fenêtre de confirmation avant de stopper', function () {
    vue.affiche('#point-insertion', $);

    $('#point-insertion .bouton-stop').click();
    expect($('#fenetre-modale').length).to.equal(1);
    expect($('label').text()).to.equal('situation.stop');
  });

  it("enregistre l'événement et redirige vers l'accueil quand on confirme la modale", function () {
    mockJournal.enregistre = (evenement) => {
      expect(evenement).to.be.a(EvenementStop);
      return Promise.resolve();
    };
    return vue.clickSurOk().then(() => {
      expect(situation.etat()).to.eql(STOPPEE);
      expect(retourAccueil).to.equal(true);
    });
  });

  it("Redirige vers l'accueil même si l'enregistrement échoue", function (done) {
    retourAccueil = false;
    mockJournal.enregistre = (evenement) => {
      return Promise.reject(new Error('serveur non joignable'));
    };
    vue.clickSurOk().catch(() => {
      try {
        expect(retourAccueil).to.equal(true);
        done();
      } catch (e) {
        done(e);
      }
    });
  });
});
