import jsdom from 'jsdom-global';
import VueRejoueConsigne from 'commun/vues/rejoue_consigne';

import i18next from 'i18next';
i18next.init({
  lng: 'fr',
  resources: {
  }
});

describe('vue Rejoue Consigne', function () {
  let vue;
  let $;

  beforeEach(function () {
    jsdom('<div id="magasin"></div>');
    $ = jQuery(window);
    vue = new VueRejoueConsigne('#magasin', $);
  });

  it("sait s'insérer dans une page web", function () {
    vue.affiche();
    expect($('#magasin #rejoue-consigne').length).to.eql(1);
  });
});
