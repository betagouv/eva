import $ from 'jquery';

import Bac from 'commun/modeles/bac';
import VueBac from 'commun/vues/bac';

describe("La vue d'un bac", function () {
  beforeEach(function () {
    $('body').append('<div id="point-insertion"></div>');
  });

  it("s'affiche à partir d'un point d'insertion", function () {
    const bac = new Bac({ x: 10, y: 15, largeur: 20, hauteur: 30 });
    const vue = new VueBac(bac);
    expect($('.bac').length).to.equal(0);

    vue.affiche('#point-insertion', $);

    expect($('#point-insertion .bac').length).to.equal(1);
  });

  it("se positionne correctement vis-à-vis de l'élément parent", function () {
    const bac = new Bac({ x: 10, y: 12, largeur: 20, hauteur: 30 });
    const vue = new VueBac(bac);

    vue.affiche('#point-insertion', $);

    expect($('.bac').attr('style')).to.eql('left: 10%; top: 12%; width: 20%; height: 30%;');
  });

  it("s'abonne au changement d'état survolé", function () {
    const bac = new Bac({});
    const vue = new VueBac(bac);
    vue.affiche('#point-insertion', $);
    expect($('.bac.survole').length).to.equal(0);
    bac.passeEnEtatSurvole();
    expect($('.bac.survole').length).to.equal(1);
    bac.reinitialiseEtatSurvole();
    expect($('.bac.survole').length).to.equal(0);
  });
});
