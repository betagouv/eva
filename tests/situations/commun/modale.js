import $ from 'jquery';

import { afficheFenetreModale } from 'commun/vues/modale';

describe('fenetre modale', function () {
  beforeEach(function () {
    $('body').append('<div id="point-insertion"></div>');
  });

  it("sait s'ajouter dans une page web", function () {
    afficheFenetreModale('#point-insertion', $, 'message', () => {});

    const $fenetre = $('#fenetre-modale');
    expect($fenetre.length).to.equal(1);
    expect($fenetre.find('label').text()).to.equal('message');
  });

  it("execute l'action quand on clique le bouton Ok", function (done) {
    afficheFenetreModale('#point-insertion', $, 'message', () => {
      done();
    });

    $('#OK-modale').click();
  });

  it("supprime la fenêtre quand l'action Ok est finie", function () {
    const promesseOk = Promise.resolve();
    afficheFenetreModale($('#point-insertion'), $, 'message', () => {
      return promesseOk;
    });

    $('#OK-modale').click();
    return promesseOk.then(() => {
      expect($('#fenetre-modale').length).to.equal(0);
    });
  });

  it("supprime la fenêtre quand l'action ok est fini même si ce n'est pas une promessse", function () {
    afficheFenetreModale($('#point-insertion'), $, 'message', () => { });

    $('#OK-modale').click();
    return Promise.resolve().then(() => {
      expect($('#fenetre-modale').length).to.equal(0);
    });
  });

  it('supprime la fenêtre modal quand on clique sur annuler', () => {
    afficheFenetreModale('#point-insertion', $, 'message', () => {});

    $('#annuler-modale').click();
    expect($('#fenetre-modale').length).to.equal(0);
  });

  it("affiche un sablier après l'appuie sur OK", function () {
    afficheFenetreModale($('#point-insertion'), $, 'message', () => {});
    $('#OK-modale').click();
    expect($('#fenetre-modale').hasClass('attendre')).to.be.ok();
  });
});
