import jsdom from 'jsdom-global';
import { VueFin } from 'commun/vues/fin.js';

describe('Affiche les éléments liés à la fin de la situation', function () {
  let vueFin;
  let $;

  beforeEach(function () {
    jsdom('<div class="actions"></div>');
    $ = jQuery(window);
    vueFin = new VueFin();
  });

  it('affiche le message de succés', function () {
    vueFin.affiche('.actions', $);
    expect($('.message-succes').length).to.equal(1);
  });
});
