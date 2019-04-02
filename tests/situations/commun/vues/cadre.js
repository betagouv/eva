import jsdom from 'jsdom-global';

import { VueCadre } from 'commun/vues/cadre';

function uneVue (callbackAffichage = () => {}) {
  return { affiche: callbackAffichage };
}

describe('Une vue du cadre', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="une-situation"></div>');
    $ = jQuery(window);
  });

  it("Affiche une scene comme point d'insertion de la vue situation", function () {
    const vueSituation = uneVue();
    const vueCadre = new VueCadre(vueSituation);
    expect($('#une-situation .scene').length).to.equal(0);

    vueCadre.affiche('#une-situation', $);
    expect($('#une-situation .scene').length).to.equal(1);
  });

  it('affiche une situation donnée', function (done) {
    const vueSituation = uneVue(function (pointInsertion, jQuery) {
      expect(pointInsertion).to.equal('.scene');
      expect(jQuery).to.equal($);
      done();
    });
    const vueCadre = new VueCadre(vueSituation);
    vueCadre.affiche('#une-situation', $);
  });

  it("affiche la barre d'action", function () {
    const vueSituation = uneVue();
    const vueCadre = new VueCadre(vueSituation);
    vueCadre.affiche('#une-situation', $);

    expect($('.actions').length).to.equal(1);
  });
});
