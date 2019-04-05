import jsdom from 'jsdom-global';

import ActionOverlay from 'commun/vues/action_overlay';

describe('une action overlay', () => {
  let $;
  let vue;

  beforeEach(() => {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    vue = new ActionOverlay('image', 'texte', 'ma-classe');
    vue.affiche('#pointInsertion', $);
  });

  it('a un overlay', () => {
    expect($('#pointInsertion .overlay').length).to.eql(1);
  });

  it("affiche le message, l'image et la classe spécifique", () => {
    expect($('#pointInsertion .message').text()).to.eql('texte');
    expect($('#pointInsertion .bouton-centre.ma-classe').length).to.eql(1);
    expect($('#pointInsertion .bouton-centre img').attr('src')).to.eql('image');
  });

  it('appelle la méthode click sur le bouton', (done) => {
    vue.click = done;
    const $bouton = $('.bouton-centre', '.overlay');
    $bouton.click();
  });

  it('sait se cacher', () => {
    vue.cache($);
    expect($('#pointInsertion .overlay').length).to.eql(0);
  });
});
