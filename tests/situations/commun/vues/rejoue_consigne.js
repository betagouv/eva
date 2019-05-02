import jsdom from 'jsdom-global';
import VueRejoueConsigne from 'commun/vues/rejoue_consigne';
import Situation from 'commun/modeles/situation';
import EvenementRejoueConsigne from 'commun/modeles/evenement_rejoue_consigne';

describe('vue Rejoue Consigne', function () {
  let situation;
  let vue;
  let $;
  let journal;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    journal = {};
    situation = new class extends Situation {
      constructor () {
        super();
        this.audios = {
          consigne: { play: () => Promise.resolve() }
        };
      }
    }();

    vue = new VueRejoueConsigne(situation.audios.consigne, journal);
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche('#pointInsertion', $);
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(1);
  });

  it('journalise un événement RejoueConsigne', function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).to.be.a(EvenementRejoueConsigne);
      done();
    };
    vue.affiche('#pointInsertion', $);
    vue.click($);
  });
});
