import jsdom from 'jsdom-global';

import Situation, { FINI } from 'commun/modeles/situation';
import VueFin from 'controle/vues/fin';

describe('La vue de fin', function () {
  let $;
  let situation;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    situation = new Situation();
  });

  it("s'ajoute dans le DOM à partir d'un point d'insertion", function () {
    const vue = new VueFin(situation);
    expect($('.overlay.invisible').length).to.equal(0);

    vue.affiche('#pointInsertion', $);

    expect($('.overlay.invisible').length).to.equal(1);
  });

  it("s'affiche lorsque la situation passe en vue terminé", function () {
    const vue = new VueFin(situation);
    vue.affiche('#pointInsertion', $);
    situation.resultat = {
      bien_placees: 3,
      mal_placees: 2,
      ratees: 1
    };
    situation.modifieEtat(FINI);
    expect($('.overlay').hasClass('invisible')).to.be(false);
    expect($('.overlay .message-fin').length).to.equal(1);
    expect($('.overlay .message-fin p').length).to.equal(3);
  });
});
