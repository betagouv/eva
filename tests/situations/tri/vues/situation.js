import jsdom from 'jsdom-global';

import VueSituation from 'tri/vues/situation';

describe('La situation « Tri »', function () {
  let $;
  let mockDepotRessources;
  let situation;
  let journal;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
    mockDepotRessources = new class {
      fondSituation () {
        return {
          src: 'image-de-fond'
        };
      }
    }();
  });

  it('affiche le fond', function () {
    const vueSituation = new VueSituation(situation, journal, mockDepotRessources);
    vueSituation.affiche('#point-insertion', $);
    expect($('#point-insertion').hasClass('tri')).to.be(true);
    expect($('#point-insertion').css('background-image')).to.equal('url(image-de-fond)');
  });
});
