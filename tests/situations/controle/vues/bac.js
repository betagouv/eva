import jsdom from 'jsdom-global';

import { Bac } from 'controle/modeles/bac';
import { PIECE_CONFORME, PIECE_DEFECTUEUSE } from 'controle/modeles/piece';
import { VueBac } from 'controle/vues/bac';

describe("La vue d'un bac", function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="controle" style="width: 100px; height: 100px"></div>');
    $ = jQuery(window);
  });

  it("s'affiche à partir d'un point d'insertion", function () {
    const bac = new Bac({ x: 10, y: 15, largeur: 20, hauteur: 30 });
    const vue = new VueBac(bac);
    expect($('.bac').length).to.equal(0);

    vue.affiche('#controle', $);

    expect($('#controle .bac').length).to.equal(1);
  });

  it("se positionne correctement vis-à-vis de l'élément parent", function () {
    const bac = new Bac({ x: 10, y: 12, largeur: 20, hauteur: 30 });
    const vue = new VueBac(bac);

    $('#controle').width(200).height(150);
    vue.affiche('#controle', $);

    expect($('.bac').css('left')).to.eql('20px');
    expect($('.bac').css('top')).to.eql('18px');
    expect($('.bac').css('width')).to.eql('40px');
    expect($('.bac').css('height')).to.eql('45px');
  });

  it('affiche le bac des pièces conformes', function () {
    const bac = new Bac({ categorie: PIECE_CONFORME });
    const vue = new VueBac(bac);
    expect($('.bac.pieces-conformes').length).to.equal(0);

    vue.affiche('#controle', $);

    expect($('.bac.pieces-conformes').length).to.equal(1);
    expect($('.bac.pieces-defectueuses').length).to.equal(0);
  });

  it('affiche le bac des pièces défectueuses', function () {
    const bac = new Bac({ categorie: PIECE_DEFECTUEUSE });
    const vue = new VueBac(bac);
    expect($('.bac.pieces-conformes').length).to.equal(0);

    vue.affiche('#controle', $);

    expect($('.bac.pieces-defectueuses').length).to.equal(1);
    expect($('.bac.pieces-conformes').length).to.equal(0);
  });

  it("s'abonne au changement d'état survolé", function () {
    const bac = new Bac({});
    const vue = new VueBac(bac);
    vue.affiche('#controle', $);
    expect($('.bac.survole').length).to.equal(0);
    bac.passeEnEtatSurvole();
    expect($('.bac.survole').length).to.equal(1);
    bac.reinitialiseEtatSurvole();
    expect($('.bac.survole').length).to.equal(0);
  });
});
