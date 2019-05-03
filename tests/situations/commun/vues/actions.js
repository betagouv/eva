import jsdom from 'jsdom-global';
import VueActions from 'commun/vues/actions';
import SituationCommune from 'commun/modeles/situation';
import DepotRessourcesControle from 'controle/infra/depot_ressources_controle';
import chargeurs from '../../commun/aides/mock_chargeurs';

describe('Affiche les éléments communs aux situations', function () {
  let vueActions;
  let situation;
  let $;
  let depotRessources;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    $ = jQuery(window);
    situation = new SituationCommune();
    depotRessources = new DepotRessourcesControle(chargeurs());

    vueActions = new VueActions(situation, {}, depotRessources);
    return depotRessources.chargement();
  });

  it('regroupe les éléments dans un conteneur', function () {
    vueActions.affiche('#magasin', $);
    expect($('.actions').length).to.equal(1);
  });

  it('Affiche les éléments en commun des situations (bouton stop, bouton rejoue consigne)', function () {
    vueActions.affiche('#magasin', $);
    expect($('.bouton-stop').length).to.equal(1);
    expect($('.bouton-lire-consigne', '.actions').length).to.equal(1);
  });

  it('cache le conteneur', function () {
    vueActions.affiche('#magasin', $);
    vueActions.cache();
    expect($('.actions.invisible').length).to.equal(1);
  });
});
