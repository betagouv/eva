import jsdom from 'jsdom-global';
import { afficheFenetreModale } from 'commun/vues/modale';

describe('fenetre modale', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
  });

  it("sait s'ajouter dans une page web", function () {
    afficheFenetreModale($('#point-insertion'), $, 'message', () => {});

    const $fenetre = $('#fenetre-modale');
    expect($fenetre.length).to.equal(1);
    expect($fenetre.find('label').text()).to.equal('message');
  });

  it("execute l'action quand on clique le bouton Ok", function (done) {
    afficheFenetreModale($('#point-insertion'), $, 'message', () => {
      done();
    });

    $('#OK-modale').click();
  });

  it('supprime la fenêtre modal quand on clique sur annuler', () => {
    afficheFenetreModale($('#point-insertion'), $, 'message', () => {});

    $('#annuler-modale').click();
    expect($('#fenetre-modale').length).to.equal(0);
  });
});
