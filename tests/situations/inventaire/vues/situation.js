import jsdom from 'jsdom-global';
import { unMagasinVide } from '../aides/magasin.js';
import { VueSituation } from 'inventaire/vues/situation.js';

describe('La situation « Inventaire »', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="situation"></div>');
    $ = jQuery(window);
  });

  it('affiche les étagères', function () {
    const vueSituation = new VueSituation(unMagasinVide());
    expect($('#situation .etageres').length).to.equal(0);

    vueSituation.affiche('#situation', $);

    expect($('#situation .etageres').length).to.equal(1);
  });
});
