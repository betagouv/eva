import jsdom from 'jsdom-global';
import { Situation } from 'controle/modeles/situation.js';
import { VueSituation } from 'controle/vues/situation.js';

describe('La situation « Contrôle »', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="situation-controle"></div>');
    $ = jQuery(window);
  });

  it('Affiche les pièces en séquence selon le scénario pré-établi', function (done) {
    const situation = new Situation({
      cadence: 10,
      scenario: [true, false],
      positionApparitionPieces: { x: 10, y: 20 },
      dureeViePiece: 20
    });

    const vueSituation = new VueSituation(situation, () => { });
    vueSituation.affiche('#situation-controle', $);

    setTimeout(function () {
      let $pieces = $('.piece');
      expect($pieces.length).to.equal(2);
      expect($pieces.eq(0).hasClass('conforme')).to.be(true);
      expect($pieces.eq(1).hasClass('defectueuse')).to.be(true);
      done();
    }, 25);
  });
});
