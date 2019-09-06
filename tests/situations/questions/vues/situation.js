import $ from 'jquery';

import Situation, { EVENEMENT_REPONSE as EVENEMENT_REPONSE_SITUATION } from 'questions/modeles/situation';
import EvenementReponse from 'questions/modeles/evenement_reponse';
import VueSituation from 'questions/vues/situation';
import { EVENEMENT_REPONSE as EVENEMENT_REPONSE_VUE } from 'questions/vues/redaction_note';

describe('La vue de la situation « Question »', function () {
  let depotRessources;
  let situation;
  let journal;
  let registreUtilisateur;

  beforeEach(function () {
    $('body').append('<div id="point-insertion"></div>');
    $.fx.off = true;
    depotRessources = new class {}();
    depotRessources.charge = () => {};
    depotRessources.ressource = (ressource) => {
      return {
        questions: [
          { type: 'redaction_note' },
          { type: 'qcm', choix: [{ id: 1, type_choix: 'bon' }] }
        ]
      };
    };
    journal = { enregistre () {} };
    situation = new Situation();
    registreUtilisateur = {
      urlEvaluation () {
        return 'urlEvaluation';
      }
    };
  });

  it('affiche la première question', function () {
    const vue = new VueSituation(situation, journal, depotRessources, registreUtilisateur);

    vue.affiche('#point-insertion', $);
    expect($('.question').length).to.eql(1);
  });

  it('enregistre la réponse dans le modèle lorsque la vue répond', function (done) {
    const vue = new VueSituation(situation, journal, depotRessources, registreUtilisateur);

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
        expect(evenement.donnees()).to.eql({ question: 2, reponse: 'Ma réponse' });
        done();
      }
    };
    const vue = new VueSituation(situation, journal, depotRessources, registreUtilisateur);

    vue.affiche('#point-insertion', $);
    situation.emit(EVENEMENT_REPONSE_SITUATION, { id: 2 }, 'Ma réponse');
  });

  it('affiche la question suivante une fois la première répondu', function () {
    const vue = new VueSituation(situation, journal, depotRessources, registreUtilisateur);

    vue.affiche('#point-insertion', $);
    expect($('#numeratie').length).to.eql(0);
    situation.repond('Ma réponse');
    expect($('#numeratie').length).to.eql(1);
  });

  it('garde la dernière question affiché à la fin', function () {
    const vue = new VueSituation(situation, journal, depotRessources, registreUtilisateur);
    vue.affiche('#point-insertion', $);
    situation.repond('Ma réponse');
    situation.repond(1);
    expect($('#numeratie').length).to.eql(1);
  });

  it('affiche un indicateur de progression', function () {
    const vue = new VueSituation(situation, journal, depotRessources, registreUtilisateur);
    vue.affiche('#point-insertion', $);
    expect($('.progression-question').length).to.eql(1);
  });
});
