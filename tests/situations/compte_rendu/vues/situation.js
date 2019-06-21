import jsdom from 'jsdom-global';
import jQuery from 'jquery';

import EvenementReponseEnvoyee from 'compte_rendu/modeles/evenement_reponse_envoyee';
import VueSituation from 'compte_rendu/vues/situation';

describe('La vue de la situation « Compte-rendu »', function () {
  let $;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
  });

  it('affiche une zone de saisie de texte', function () {
    const $vue = new VueSituation();
    expect($('#point-insertion .situation #reponse-compte-rendu').length).to.equal(0);

    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion .situation #reponse-compte-rendu').length).to.equal(1);
  });

  it("affiche un bouton d'envoi de réponse", function () {
    const $vue = new VueSituation();
    expect($('#point-insertion .situation #envoi-reponse').length).to.equal(0);

    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion .situation #envoi-reponse').length).to.equal(1);
  });

  it('enregistre la réponse dans le journal quand on appuie sur le bouton envoi', function (done) {
    const journal = {
      enregistre (evenement) {
        expect(evenement).to.be.a(EvenementReponseEnvoyee);
        expect(evenement.donnees()).to.eql({ reponse: 'Ma réponse' });
        done();
      }
    };
    const $vue = new VueSituation(journal);

    $vue.affiche('#point-insertion', $);
    $('.situation #reponse-compte-rendu').val('     Ma réponse  ');
    $('.situation #envoi-reponse').click();
  });
});
