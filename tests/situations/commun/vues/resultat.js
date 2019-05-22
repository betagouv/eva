import jsdom from 'jsdom-global';

import Situation, { FINI } from 'commun/modeles/situation';
import VueResultat from 'commun/vues/resultat';

describe('La vue de résultat', function () {
  let $;
  let situation;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    situation = new Situation();
  });

  it("s'ajoute dans le DOM à partir d'un point d'insertion", function () {
    const vue = new VueResultat(situation, 'test-situation');
    expect($('.overlay.invisible').length).to.equal(0);

    vue.affiche('#pointInsertion', $);

    expect($('.overlay.invisible').length).to.equal(1);
  });

  it("s'affiche lorsque la situation passe en vue terminé", function () {
    const vue = new VueResultat(situation, 'test-situation');
    vue.affiche('#pointInsertion', $);
    situation.resultat = {
      valeur1: 4,
      valeur2: 10
    };
    situation.modifieEtat(FINI);
    expect($('.overlay').hasClass('invisible')).to.be(false);
    expect($('.overlay .message-fin').length).to.equal(1);
    expect($('.overlay .message-fin p').length).to.equal(2);
    expect($('.overlay .message-fin p').first().text()).to.eql('test-situation.resultat.valeur1');
  });
});
