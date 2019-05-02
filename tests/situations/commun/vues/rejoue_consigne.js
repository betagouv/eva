import jsdom from 'jsdom-global';
import VueRejoueConsigne from 'commun/vues/rejoue_consigne';
import Situation from 'commun/modeles/situation';

describe('vue Rejoue Consigne', function () {
  let situation;
  let vue;
  let $;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    situation = new class extends Situation {
      constructor () {
        super();
        this.audios = {
          consigne: { play: () => Promise.resolve() }
        };
      }
    }();

    vue = new VueRejoueConsigne(situation.audios.consigne);
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche('#pointInsertion', $);
    expect($('#pointInsertion .bouton-lire-consigne').length).to.eql(1);
  });
});
