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
    expect($fenetre.length).to.equal(1);
    expect($fenetre.find('h2').text()).to.equal('titre');
    expect($fenetre.find('#OK-modale').text()).to.equal('OK');
    expect($fenetre.find('#annuler-modale').text()).to.equal('annuler');
  });

  it("execute l'action quand on clique le bouton Ok", function (done) {
    afficheFenetreModale('#point-insertion', $,
      {
        actionOk: done
      });

    $('#OK-modale').click();
  });

  it("supprime la fenêtre quand l'action Ok est finie", function () {
    const promesseOk = Promise.resolve();
    afficheFenetreModale($('#point-insertion'), $, {
      actionOk: () => {
        return promesseOk;
      }
    });

    $('#OK-modale').click();
    return promesseOk.then(() => {
      expect($('#fenetre-modale').length).to.equal(0);
    });
  });

  it("supprime la fenêtre quand l'action ok est fini même si ce n'est pas une promessse", function () {
    afficheFenetreModale($('#point-insertion'), $, {
      actionOk: () => { }
    });

    $('#OK-modale').click();
    return Promise.resolve().then(() => {
      expect($('#fenetre-modale').length).to.equal(0);
    });
  });

  it('supprime la fenêtre modal quand on clique sur annuler', () => {
    afficheFenetreModale('#point-insertion', $, {
      boutonAnnuler: 'Annuler'
    });

    $('#annuler-modale').click();
    expect($('#fenetre-modale').length).to.equal(0);
  });

  it("affiche un sablier après l'appuie sur OK", function () {
    afficheFenetreModale($('#point-insertion'), $, {
      actionOk: () => {}
    });
    $('#OK-modale').click();
    expect($('#fenetre-modale').hasClass('attendre')).to.be.ok();
  });
});
