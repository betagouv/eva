import jsdom from 'jsdom-global';
import jQuery from 'jquery';
import VueAccesSituation from 'accueil/vues/acces_situation';
import AccesSituation from 'accueil/modeles/acces_situation';

describe('La vue pour accéder à une situation', function () {
  let $;
  let depotRessources;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    depotRessources = new class {
      batimentSituation (identifiant) {
        return { src: identifiant };
      }
    }();
  });

  it("sait s'afficher", function () {
    const accesSituation = new AccesSituation({ nom: 'ABC', chemin: 'abc.html', identifiant: 'identifiant-abc' });
    const vueAccesSituation = new VueAccesSituation(accesSituation, depotRessources);

    vueAccesSituation.affiche('#pointInsertion', $);
    const $accesSituation = $('#pointInsertion .acces-situation');

    expect($accesSituation.text()).to.contain('ABC');
    expect($accesSituation.attr('href')).to.equal('abc.html');
    expect($accesSituation.hasClass('identifiant-abc')).to.be(true);
    expect($accesSituation.css('background-image')).to.equal('url(identifiant-abc)');
  });
});
