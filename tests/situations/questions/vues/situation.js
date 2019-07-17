import jsdom from 'jsdom-global';
import jQuery from 'jquery';

import Situation, { EVENEMENT_REPONSE as EVENEMENT_REPONSE_SITUATION } from 'questions/modeles/situation';
import EvenementReponse from 'questions/modeles/evenement_reponse';
import VueSituation from 'questions/vues/situation';
import { EVENEMENT_REPONSE as EVENEMENT_REPONSE_VUE } from 'questions/vues/redaction_note';
import MockDepotRessourcesQuestions from '../aides/mock_depot_ressources';

describe('La vue de la situation « Question »', function () {
  let $;
  let depotRessources;
  let situation;
  let journal;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
    $.fx.off = true;
    depotRessources = new MockDepotRessourcesQuestions();
    journal = { enregistre () {} };
    situation = new Situation({ questions: [
      { 'type': 'redaction_note', 'choix': [] },
      { 'type': 'qcm', 'choix': [] }
    ] });
  });

  it('affiche la première question', function () {
    const vue = new VueSituation(situation, journal, depotRessources);

    vue.affiche('#point-insertion', $);
    expect($('.question').length).to.eql(1);
  });

  it('enregistre la réponse dans le modèle lorsque la vue répond', function (done) {
    const vue = new VueSituation(situation, journal, depotRessources);

    situation.repond = (reponse) => {
      expect(reponse).to.eql('Ma réponse');
      done();
    };

    vue.affiche('#point-insertion', $);
    vue.question.emit(EVENEMENT_REPONSE_VUE, 'Ma réponse');
  });

  it('enregistre la réponse dans le journal', function (done) {
    journal = {
      enregistre (evenement) {
        expect(evenement).to.be.a(EvenementReponse);
        expect(evenement.donnees()).to.eql({ question: 'litteratie', reponse: 'Ma réponse' });
        done();
      }
    };
    const vue = new VueSituation(situation, journal, depotRessources);

    vue.affiche('#point-insertion', $);
    situation.emit(EVENEMENT_REPONSE_SITUATION, 'litteratie', 'Ma réponse');
  });

  it('affiche la question suivante une fois la première répondu', function () {
    const vue = new VueSituation(situation, journal, depotRessources);

    vue.affiche('#point-insertion', $);
    expect($('#numeratie').length).to.eql(0);
    situation.repond('Ma réponse');
    expect($('#numeratie').length).to.eql(1);
  });

  it('garde la dernière question affiché a la fin', function () {
    const vue = new VueSituation(situation, journal, depotRessources);
    vue.affiche('#point-insertion', $);
    situation.repond('Ma réponse');
    situation.repond('Ma réponse');
    expect($('#numeratie').length).to.eql(1);
  });
});
