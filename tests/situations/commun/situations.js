import jsdom from 'jsdom-global';
import { ActionsCommunesSituation } from 'commun/vues/actions_communes_situation.js';

describe('Affiche les éléments communs aux situations', function () {
  let vue;
  let $;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    $ = jQuery(window);
    vue = new ActionsCommunesSituation('#magasin', $);
  });

  it('Affiche les éléments en commun des situations (bouton stop)', function () {
    vue.afficheElementEnCommun();
    expect($('#stop').length).to.equal(1);
  });
});
