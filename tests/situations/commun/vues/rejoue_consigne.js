import jsdom from 'jsdom-global';
import VueRejoueConsigne from 'commun/vues/rejoue_consigne';
import Situation from 'commun/modeles/situation';

describe('vue Rejoue Consigne', function () {
  let situation;
  let vue;
  let $;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    $ = jQuery(window);
    situation = new class extends Situation {
      constructor () {
        super();
        this.audios = {
          consigne: { play: () => Promise.resolve() }
        };
      }
    }();

    vue = new VueRejoueConsigne('#magasin', $, situation, situation.audios.consigne);
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche('#magasin', $);
    expect($('#magasin .bouton-lire-consigne').length).to.eql(1);
  });
});
