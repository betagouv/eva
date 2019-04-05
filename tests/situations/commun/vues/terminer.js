import jsdom from 'jsdom-global';
import { VueTerminer } from 'commun/vues/terminer.js';

describe('Affiche les éléments liés à la fin de la situation', function () {
  let vueTerminer;
  let $;

  beforeEach(function () {
    jsdom('<div class="actions"></div>');
    $ = jQuery(window);
    vueTerminer = new VueTerminer();
  });

  it('affiche le message de succés', function () {
    vueTerminer.afficher('.actions', $);
    expect($('.message-succes').length).to.equal(1);
  });

  it('affiche le bouton terminer', function () {
    vueTerminer.afficher('.actions', $);
    expect($('.bouton-terminer').length).to.equal(1);
  });
});
