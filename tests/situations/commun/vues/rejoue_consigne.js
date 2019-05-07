import jsdom from 'jsdom-global';
import VueRejoueConsigne from 'commun/vues/rejoue_consigne';
import EvenementRejoueConsigne from 'commun/modeles/evenement_rejoue_consigne';

describe('vue Rejoue Consigne', function () {
  let vue;
  let $;
  let journal;
  let consigne;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    journal = { enregistre () {} };
    consigne = { play () {} };

    vue = new VueRejoueConsigne(consigne, journal);
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche('#pointInsertion', $);
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(1);
  });

  it('passe en état lecture en cours', function () {
    vue.affiche('#pointInsertion', $);
    vue.click($);
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(0);
    expect($('#pointInsertion .bouton-lecture-en-cours').length).to.eql(1);
  });

  it("à la fin de la lecture, repasse à l'état initial", function () {
    vue.affiche('#pointInsertion', $);
    vue.click($);
    $(consigne).trigger('ended');
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(1);
    expect($('#pointInsertion .bouton-lecture-en-cours').length).to.eql(0);
  });

  it('on peut lire la consigne plusieurs fois', function () {
    vue.affiche('#pointInsertion', $);
    vue.click($);
    $(consigne).trigger('ended');
    vue.click($);
    $(consigne).trigger('ended');
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(1);
    expect($('#pointInsertion .bouton-lecture-en-cours').length).to.eql(0);
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
