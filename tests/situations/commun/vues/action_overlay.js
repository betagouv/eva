import jsdom from 'jsdom-global';
import jQuery from 'jquery';

import ActionOverlay from 'commun/vues/action_overlay';

describe('une action overlay', () => {
  let $;
  let vue;

  beforeEach(() => {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    vue = new ActionOverlay('image', 'texte', 'classe-bouton');
    vue.affiche('#pointInsertion', $);
  });

  it('a un overlay', () => {
    expect($('#pointInsertion .overlay').length).to.eql(1);
  });

  it("affiche le message, l'image et la classe spécifique", () => {
    expect($('#pointInsertion .message').text()).to.eql('texte');
    expect($('#pointInsertion .classe-bouton').length).to.eql(1);
    expect($('#pointInsertion .classe-bouton img').attr('src')).to.eql('image');
  });

  it('appelle la méthode click sur le bouton', (done) => {
    vue.click = done;
    const $bouton = $('.classe-bouton', '.overlay');
    $bouton.click();
  });

  it('sait se cacher', () => {
    vue.cache($);
    expect($('#pointInsertion .overlay').length).to.eql(0);
  });
});
