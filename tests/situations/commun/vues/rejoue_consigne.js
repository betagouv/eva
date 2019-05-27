import jsdom from 'jsdom-global';
import VueRejoueConsigne from 'commun/vues/rejoue_consigne';
import EvenementRejoueConsigne from 'commun/modeles/evenement_rejoue_consigne';
import MockAudioNode from '../aides/mock_audio_node';
import SituationCommune from 'commun/modeles/situation';

describe('vue Rejoue Consigne', function () {
  let vue;
  let $;
  let journal;
  let mockDepotResources;
  let situation;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    journal = { enregistre () {} };
    situation = new SituationCommune();
    mockDepotResources = new class {
      consigne () {
        this.derniereConsigneRetournee = new MockAudioNode();
        return this.derniereConsigneRetournee;
      }

      consigneCommune () {
        this.consigneCommune = new MockAudioNode();
        return this.consigneCommune;
      }

      finConsigne () {
        $(this.consigneCommune).trigger('ended');
      }
    }();

    vue = new VueRejoueConsigne(mockDepotResources, journal);
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche('#pointInsertion', $, situation);
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(1);
  });

  it('passe en état lecture en cours', function () {
    vue.affiche('#pointInsertion', $, situation);
    vue.joueConsigne($);
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(0);
    expect($('#pointInsertion .bouton-lecture-en-cours').length).to.eql(1);
  });

  it("à la fin de la lecture, repasse à l'état initial", function () {
    vue.affiche('#pointInsertion', $, situation);
    mockDepotResources.finConsigne();
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(1);
    expect($('#pointInsertion .bouton-lecture-en-cours').length).to.eql(0);
  });

  it('on peut lire la consigne plusieurs fois', function () {
    vue.affiche('#pointInsertion', $, situation);
    mockDepotResources.finConsigne();
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(1);
  });

  it('journalise un événement RejoueConsigne', function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).to.be.a(EvenementRejoueConsigne);
      done();
    };
    vue.affiche('#pointInsertion', $, situation);
    vue.joueConsigne($);
  });
});
