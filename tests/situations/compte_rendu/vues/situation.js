import jsdom from 'jsdom-global';
import jQuery from 'jquery';

import EvenementReponseEnvoyee from 'compte_rendu/modeles/evenement_reponse_envoyee';
import VueSituation from 'compte_rendu/vues/situation';
import MockDepotRessourcesCompteRendu from '../aides/mock_depot_ressources';

describe('La vue de la situation « Compte-rendu »', function () {
  let $;
  let depotRessources;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
    depotRessources = new MockDepotRessourcesCompteRendu();
  });

  it('affiche une zone de saisie de texte', function () {
    const $vue = new VueSituation(depotRessources);
    expect($('#point-insertion .situation #reponse-compte-rendu').length).to.equal(0);

    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion .situation #reponse-compte-rendu').length).to.equal(1);
  });

  it("affiche l'accident de Carine", function () {
    const $vue = new VueSituation(depotRessources);
    expect($('#point-insertion .situation .illustration').length).to.equal(0);

    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion .situation .illustration').length).to.equal(1);
    expect($('#point-insertion .situation .illustration').attr('src'))
      .to.equal('accident-carine');
  });

  it("affiche un bouton d'envoi de réponse", function () {
    const $vue = new VueSituation(depotRessources);
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
    const $vue = new VueSituation(depotRessources, journal);

    $vue.affiche('#point-insertion', $);
    $('.situation #reponse-compte-rendu').val('     Ma réponse  ');
    $('.situation #envoi-reponse').click();
  });
});
