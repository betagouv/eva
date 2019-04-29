import jsdom from 'jsdom-global';
import VueActions from 'commun/vues/actions';
import SituationCommune from 'commun/modeles/situation';
import MockAudio from '../../commun/aides/mock_audio';

describe('Affiche les éléments communs aux situations', function () {
  let vueActions;
  let situation;
  let $;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    $ = jQuery(window);
    situation = new class extends SituationCommune {
      constructor () {
        super();
        this.audios = {
          consigne: new MockAudio()
        };
      }
    }();

    vueActions = new VueActions(situation);
  });

  it('regroupe les éléments dans un conteneur', function () {
    vueActions.affiche('#magasin', $);
    expect($('.actions').length).to.equal(1);
  });

  it('Affiche les éléments en commun des situations (bouton stop, bouton rejoue consigne)', function () {
    vueActions.affiche('#magasin', $);
    expect($('#stop', '.actions').length).to.equal(1);
    expect($('.bouton-lire-consigne', '.actions').length).to.equal(1);
  });

  it('cache le conteneur', function () {
    vueActions.affiche('#magasin', $);
    vueActions.cache();
    expect($('.actions.invisible').length).to.equal(1);
  });
});
