import jsdom from 'jsdom-global';
import VueActions from 'commun/vues/actions';

describe('Affiche les éléments communs aux situations', function () {
  let vueActions;
  let $;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    $ = jQuery(window);
    vueActions = new VueActions();
  });

  it('regroupe les éléments dans un conteneur', function () {
    vueActions.affiche('#magasin', $);
    expect($('.actions').length).to.equal(1);
  });

  it('Affiche les éléments en commun des situations (bouton stop, bouton rejoue consigne)', function () {
    vueActions.affiche('#magasin', $);
    expect($('#stop', '.actions').length).to.equal(1);
    expect($('#rejoue-consigne', '.actions').length).to.equal(1);
  });

  it('cache le conteneur', function () {
    vueActions.affiche('#magasin', $);
    vueActions.cache();
    expect($('.actions.invisible').length).to.equal(1);
  });
});
