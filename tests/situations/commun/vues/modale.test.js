import $ from 'jquery';

import { afficheFenetreModale } from 'commun/vues/modale';

describe('fenetre modale', function () {
  beforeEach(function () {
    $('body').append('<div id="point-insertion"></div>');
  });

  it("sait s'ajouter dans une page web", function () {
    afficheFenetreModale('#point-insertion', $,
      {
        titre: 'titre',
        boutonOk: 'OK',
        boutonAnnuler: 'annuler'
      });

    const $fenetre = $('#fenetre-modale');
    expect($fenetre.length).toBe(1);
    expect($fenetre.find('h2').text()).toBe('titre');
    expect($fenetre.find('#OK-modale').text()).toBe('OK');
    expect($fenetre.find('#annuler-modale').text()).toBe('annuler');
  });

  it("execute l'action quand on clique le bouton Ok", function (done) {
    afficheFenetreModale('#point-insertion', $,
      {
        actionOk: done
      });

    $('#OK-modale').click();
  });

  it('supprime la fenêtre modal quand on clique sur annuler', function () {
    afficheFenetreModale('#point-insertion', $, {
      boutonAnnuler: 'Annuler'
    });

    $('#annuler-modale').click();
    expect($('#fenetre-modale').length).toBe(0);
  });

  it("affiche un sablier après l'appuie sur OK", function () {
    afficheFenetreModale($('#point-insertion'), $, {
      actionOk: () => {}
    });
    $('#OK-modale').click();
    expect($('#fenetre-modale').hasClass('attendre')).toBe(true);
  });
});
