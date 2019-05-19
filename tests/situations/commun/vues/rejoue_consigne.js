import jsdom from 'jsdom-global';
import VueRejoueConsigne from 'commun/vues/rejoue_consigne';
import EvenementRejoueConsigne from 'commun/modeles/evenement_rejoue_consigne';
import MockAudioNode from '../aides/mock_audio_node';

describe('vue Rejoue Consigne', function () {
  let vue;
  let $;
  let journal;
  let mockDepotResources;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    journal = { enregistre () {} };

    mockDepotResources = new class {
      consigne () {
        this.derniereConsigneRetournee = new MockAudioNode();
        return this.derniereConsigneRetournee;
      }

      finConsigne () {
        $(this.derniereConsigneRetournee).trigger('ended');
      }
    }();

    vue = new VueRejoueConsigne(mockDepotResources, journal);
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche('#pointInsertion', $);
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(1);
  });

  it('passe en état lecture en cours', function () {
    vue.affiche('#pointInsertion', $);
    vue.joueConsigne($);
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(0);
    expect($('#pointInsertion .bouton-lecture-en-cours').length).to.eql(1);
  });

  it("à la fin de la lecture, repasse à l'état initial", function () {
    vue.affiche('#pointInsertion', $);
    vue.joueConsigne($);
    mockDepotResources.finConsigne();
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(1);
    expect($('#pointInsertion .bouton-lecture-en-cours').length).to.eql(0);
  });

  it('on peut lire la consigne plusieurs fois', function () {
    vue.affiche('#pointInsertion', $);
    vue.joueConsigne($);
    mockDepotResources.finConsigne();
    vue.joueConsigne($);
    mockDepotResources.finConsigne();
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(1);
    expect($('#pointInsertion .bouton-lecture-en-cours').length).to.eql(0);
  });

  it('journalise un événement RejoueConsigne', function (done) {
    journal.enregistre = (evenement) => {
      expect(evenement).to.be.a(EvenementRejoueConsigne);
      done();
    };
    vue.affiche('#pointInsertion', $);
    vue.joueConsigne($);
  });
});
