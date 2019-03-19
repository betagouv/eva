import jsdom from 'jsdom-global';

import { VueCadre } from 'commun/vues/cadre.js';

function uneVue (callbackAffichage = () => {}) {
  return { affiche: callbackAffichage };
}

describe('Une vue du cadre', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="une-situation"></div>');
    $ = jQuery(window);
  });

  it("s'affiche", function () {
    const vueSituation = uneVue();
    const vueCadre = new VueCadre(vueSituation);
    expect($('#une-situation .cadre').length).to.equal(0);

    vueCadre.affiche('#une-situation', $);
    expect($('#une-situation .cadre').length).to.equal(1);
  });

  it('affiche une situation donnée', function (done) {
    const vueSituation = uneVue(function (pointInsertion, jQuery) {
      expect(pointInsertion).to.equal('.cadre');
      expect(jQuery).to.equal($);
      done();
    });
    const vueCadre = new VueCadre(vueSituation);
    vueCadre.affiche('#une-situation', $);
  });
});
