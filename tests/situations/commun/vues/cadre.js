import jsdom from 'jsdom-global';

import { VueCadre } from 'commun/vues/cadre.js';

describe('Une vue du cadre', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="une-situation"></div>');
    $ = jQuery(window);
  });

  it("s'affiche", function () {
    const vueCadre = new VueCadre();
    expect($('#une-situation .cadre').length).to.equal(0);

    vueCadre.affiche('#une-situation', $);
    expect($('#une-situation .cadre').length).to.equal(1);
  });
});
