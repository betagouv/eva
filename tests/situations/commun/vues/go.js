import jsdom from 'jsdom-global';
import { VueGo } from 'commun/vues/go';
import { traduction } from 'commun/infra/internationalisation';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';
import Situation from 'commun/modeles/situation';

describe('vue Go', function () {
  let vue;
  let mockVueAudio = {
    joue () {}
  };
  let situation;
  let $;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    situation = new Situation();
    vue = new VueGo(mockVueAudio, situation);
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
    const $overlay = $('#overlay-go');
    expect($overlay.attr('class')).to.not.contain('clair');

    mockVueAudio.joue = (actionFinConsigne) => {
      expect($bouton.attr('class')).to.contain('bouton-lecture-en-cours');
      expect($overlay.attr('class')).to.contain('clair');
      expect($message.text()).to.eql('');
      done();
    };

    $bouton.click();
  });

  it('affiche un bouton GO à la fin de la lecture de la consigne', function () {
    vue.affiche('#pointInsertion', $);

    const $bouton = $('.bouton-centre', '#overlay-go');

    mockVueAudio.joue = (actionFinConsigne) => {
      actionFinConsigne();
    };

    $bouton.click();

    const $message = $('.message', '#overlay-go');
    expect($message.text()).to.eql(traduction('situation.go'));
    expect($('#overlay-go').attr('class')).to.not.contain('clair');
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
    situation.observe(EvenementDemarrage, () => {
      done();
    });

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
