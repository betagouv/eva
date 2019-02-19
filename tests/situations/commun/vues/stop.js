import jsdom from 'jsdom-global';
import { VueStop } from 'commun/vues/stop.js';

describe('vue Stop', function () {
  let vue;
  let $;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    $ = jQuery(window);
    vue = new VueStop('#magasin', $);
  });

  it("sait s'insérer dans une page web", function () {
    vue.afficher();
    expect($('#magasin #stop').attr('href')).to.equal('/');
  });
});
