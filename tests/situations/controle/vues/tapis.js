import jsdom from 'jsdom-global';

import { DEMARRE, FINI } from 'commun/modeles/situation';
import { Situation } from 'controle/modeles/situation';
import VueTapis from 'controle/vues/tapis';

describe('La vue du tapis', () => {
  let $;
  let situation;
  let vue;

  beforeEach(() => {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    situation = new Situation({});
    vue = new VueTapis(situation);
  });

  it("s'affiche à partir d'un point d'insertion", () => {
    expect($('.tapis').length).to.equal(0);

    vue.affiche('#pointInsertion', $);

    expect($('#pointInsertion .tapis').length).to.equal(1);
    expect($('#pointInsertion .tapis').hasClass('en-marche')).to.not.be.ok();
  });

  it("met en marche le tapis lorsque l'état est DEMARRE", () => {
    situation.modifieEtat(DEMARRE);
    vue.affiche('#pointInsertion', $);

    expect($('#pointInsertion .tapis').hasClass('en-marche')).to.be.ok();
  });

  it("stoppe le tapis lorsque c'est fini", () => {
    situation.modifieEtat(DEMARRE);
    vue.affiche('#pointInsertion', $);
    situation.modifieEtat(FINI);
    expect($('#pointInsertion .tapis').hasClass('en-marche')).to.not.be.ok();
  });
});
