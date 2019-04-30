import jsdom from 'jsdom-global';
import VueBouton from 'commun/vues/bouton';

describe('vue Bouton', function () {
  let vue;
  let $;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
    vue = new VueBouton('bouton-lire-consigne', 'imagePlayer', () => this.click());
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche('#point-insertion', $);
    expect($('.bouton-lire-consigne').length).to.eql(1);
  });
});
