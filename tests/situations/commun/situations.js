import jsdom from 'jsdom-global';
import { ActionsCommunesSituation } from 'commun/vues/actions_communes_situation.js';

describe('Affiche les éléments communs aux situations', function () {
  let vue;
  let go;
  let stop;
  let $;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    $ = jQuery(window);
    vue = new ActionsCommunesSituation('#magasin', $);
  });

  it('Affiche le bouton Stop ainsi que le bouton Go', function () {
    vue.afficheElementEnCommun(go, stop);
    expect($('#stop').length).to.equal(1);
  });
});
