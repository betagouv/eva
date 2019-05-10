import jsdom from 'jsdom-global';

import VueSituation from 'tri/vues/situation';

describe('La situation « Tri »', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
  });

  it('affiche le fond', function () {
    const vueSituation = new VueSituation();
    vueSituation.affiche('#point-insertion', $);
    expect($('#point-insertion').hasClass('tri')).to.be(true);
  });
});
