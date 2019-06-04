import jsdom from 'jsdom-global';
import jQuery from 'jquery';

import VueActions from 'commun/vues/actions';
import SituationCommune, { CONSIGNE_ECOUTEE, DEMARRE } from 'commun/modeles/situation';

describe('Affiche les éléments communs aux situations', function () {
  let vueActions;
  let situation;
  let $;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    $ = jQuery(window);
    situation = new SituationCommune();

    vueActions = new VueActions(situation, {}, new class {}());
  });

  it('regroupe les éléments dans un conteneur', function () {
    vueActions.affiche('#magasin', $);
    expect($('.actions').length).to.equal(1);
  });

  it("N'affiche pas les éléments communs au situation par défaut (bouton stop, bouton rejoue consigne)", function () {
    vueActions.affiche('#magasin', $);
    expect($('.bouton-stop').length).to.equal(0);
    expect($('.bouton-lire-consigne', '.actions').length).to.equal(0);
  });

  it("Affiche le bouton rejoue consigne une fois que l'utilisateur à joué une fois la consigne", function () {
    vueActions.affiche('#magasin', $);
    situation.modifieEtat(CONSIGNE_ECOUTEE);
    expect($('.bouton-stop').length).to.equal(0);
    expect($('.bouton-lire-consigne', '.actions').length).to.equal(1);
  });

  it("Affiche bouton stop une fois que l'utilisateur à cliqué sur GO", function () {
    vueActions.affiche('#magasin', $);
    situation.modifieEtat(DEMARRE);
    expect($('.bouton-stop').length).to.equal(1);
    expect($('.bouton-lire-consigne', '.actions').length).to.equal(0);
  });

  it('cache le conteneur', function () {
    vueActions.affiche('#magasin', $);
    vueActions.cache();
    expect($('.actions.invisible').length).to.equal(1);
  });
});
