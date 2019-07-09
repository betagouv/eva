import jsdom from 'jsdom-global';
import jQuery from 'jquery';

import VueLitteratie, { EVENEMENT_REPONSE } from 'questions/vues/litteratie';
import MockDepotRessourcesQuestions from '../aides/mock_depot_ressources';

describe('La vue de la question Littératie', function () {
  let $;
  let depotRessources;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
    depotRessources = new MockDepotRessourcesQuestions();
  });

  it('affiche une zone de saisie de texte', function () {
    const $vue = new VueLitteratie(depotRessources);
    expect($('#point-insertion #reponse-compte-rendu').length).to.equal(0);

    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion #reponse-compte-rendu').length).to.equal(1);
  });

  it("affiche l'accident de Carine", function () {
    const $vue = new VueLitteratie(depotRessources);
    expect($('#point-insertion .question-illustration').length).to.equal(0);

    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion .question-illustration').length).to.equal(1);
    expect($('#point-insertion .question-illustration').attr('src'))
      .to.equal('accident-carine');
  });

  it("affiche un bouton d'envoi de réponse", function () {
    const $vue = new VueLitteratie(depotRessources);
    expect($('#point-insertion #envoi-reponse').length).to.equal(0);

    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion #envoi-reponse').length).to.equal(1);
  });

  it('emet un événément réponse quand on appuie sur le bouton envoi', function (done) {
    const $vue = new VueLitteratie(depotRessources);

    $vue.affiche('#point-insertion', $);
    $('#point-insertion #reponse-compte-rendu').val('     Ma réponse  ');
    $vue.on(EVENEMENT_REPONSE, (reponse) => {
      expect(reponse).to.eql('Ma réponse');
      done();
    });

    $('#point-insertion #envoi-reponse').click();
  });
});
