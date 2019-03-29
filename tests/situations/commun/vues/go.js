import jsdom from 'jsdom-global';
import { VueGo } from 'commun/vues/go.js';
import { traduction } from 'commun/infra/internationalisation';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';
import Situation from 'commun/modeles/situation.js';

describe('vue Go', function () {
  let vue;
  let mockVueConsigne = {
    jouerConsigneDemarrage () {}
  };
  let mockJournal;
  let situation;
  let $;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    mockJournal = {
      enregistre () {}
    };
    situation = new Situation();
    vue = new VueGo(mockVueConsigne, situation, mockJournal);
  });

  it('affiche un bouton "lire la consigne" et le texte associé', function () {
    vue.affiche('#pointInsertion', $);

    const overlay = document.querySelector('#pointInsertion #overlay-go');
    expect(overlay.classList).to.contain('overlay');

    const $bouton = $('.bouton-centre', overlay);
    const $message = $('.message', overlay);

    expect($bouton.attr('class')).to.contain('bouton-lire-consigne-demarrage');
    expect($message.text()).to.eql(traduction('situation.ecouter-consigne'));
  });

  it('démarre la lecture de la consigne quand on appuie sur le bouton', function (done) {
    vue.affiche('#pointInsertion', $);

    const $message = $('.message', '#overlay-go');
    const $bouton = $('.bouton-centre', '#overlay-go');

    mockVueConsigne.jouerConsigneDemarrage = (actionFinConsigne) => {
      expect($bouton.attr('class')).to.contain('bouton-lecture-en-cours');
      expect($message.text()).to.eql('');
      done();
    };

    $bouton.click();
  });

  it('affiche un bouton GO à la fin de la lecture de la consigne', function () {
    vue.affiche('#pointInsertion', $);

    const $bouton = $('.bouton-centre', '#overlay-go');

    mockVueConsigne.jouerConsigneDemarrage = (actionFinConsigne) => {
      actionFinConsigne();
    };

    $bouton.click();

    const $message = $('.message', '#overlay-go');
    expect($message.text()).to.eql(traduction('situation.go'));
  });

  it("masque l'overlay et le bouton une fois le jeu démarré", function () {
    vue.affiche('#pointInsertion', $);
    vue.afficheEtat(vue.etats.go);

    $('.bouton-centre', '#overlay-go').click();

    const overlay = document.querySelector('#overlay-go');
    expect(overlay.classList).to.contain('invisible');
  });

  it('notifie la situation du démarrage', function (done) {
    vue.affiche('#pointInsertion', $);
    vue.afficheEtat(vue.etats.go);
    situation.observe(new EvenementDemarrage(), done);

    $('.bouton-centre', '#overlay-go').click();
  });

  it("journalise l'événement lorsque le jeu est démarré", function (done) {
    mockJournal.enregistre = (evenement) => {
      expect(evenement).to.be.a(EvenementDemarrage);
      done();
    };

    vue.affiche('#pointInsertion', $);
    vue.afficheEtat(vue.etats.go);

    $('.bouton-centre', '#overlay-go').click();
  });

  it('permet de passer directement au bouton go', function () {
    vue.affiche('#pointInsertion', $);
    const $overlay = $('#overlay-go');

    const appuiSurS = $.Event('keydown');
    appuiSurS.which = 'S'.charCodeAt();
    $overlay.trigger(appuiSurS);

    const $bouton = $('.bouton-centre', '#overlay-go');
    expect($bouton.attr('class')).to.contain('bouton-go');
  });
});
