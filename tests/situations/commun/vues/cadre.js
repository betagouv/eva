import jsdom from 'jsdom-global';

import { VueCadre } from 'commun/vues/cadre';

function uneVue (callbackAffichage = () => {}) {
  return { affiche: callbackAffichage };
}

describe('Une vue du cadre', function () {
  let $;
  let situation;

  beforeEach(function () {
    jsdom('<div id="une-situation"></div>');
    $ = jQuery(window);
    situation = {
      consigneAudio: 'chemin_vers_la_consigne_audio'
    };
  });

  it("Affiche une scene comme point d'insertion de la vue situation", function () {
    const vueSituation = uneVue();
    const vueCadre = new VueCadre(vueSituation, situation);
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
    const vueCadre = new VueCadre(vueSituation, situation);
    vueCadre.affiche('#une-situation', $);
  });

  it("affiche la barre d'action", function () {
    const vueCadre = new VueCadre(uneVue(), situation);
    vueCadre.affiche('#une-situation', $);

    expect($('.actions').length).to.equal(1);
  });

  it('affiche la consigne audio', function () {
    const vueCadre = new VueCadre(uneVue(), situation);
    vueCadre.affiche('#une-situation', $);

    expect($('#consigne').length).to.equal(1);
  });

  it("affiche l'overlay de démarrage", function () {
    const vueCadre = new VueCadre(uneVue(), situation);
    vueCadre.affiche('#une-situation', $);

    expect($('#overlay-go').length).to.equal(1);
  });
});
