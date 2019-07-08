import jsdom from 'jsdom-global';
import jQuery from 'jquery';

import Situation, { EVENEMENT_REPONSE as EVENEMENT_REPONSE_SITUATION } from 'compte_rendu/modeles/situation';
import EvenementReponseEnvoyee from 'compte_rendu/modeles/evenement_reponse_envoyee';
import VueSituation from 'compte_rendu/vues/situation';
import { EVENEMENT_REPONSE as EVENEMENT_REPONSE_VUE } from 'compte_rendu/vues/litteratie';
import MockDepotRessourcesCompteRendu from '../aides/mock_depot_ressources';

describe('La vue de la situation « Compte-rendu »', function () {
  let $;
  let depotRessources;
  let situation;
  let journal;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
    depotRessources = new MockDepotRessourcesCompteRendu();
    journal = { enregistre () {} };
    situation = new Situation({ questions: ['litteratie', 'numeratie'] });
  });

  it('affiche la première question', function () {
    const vue = new VueSituation(situation, journal, depotRessources);

    vue.affiche('#point-insertion', $);
    expect($('#litteratie').length).to.eql(1);
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
        expect(evenement).to.be.a(EvenementReponseEnvoyee);
        expect(evenement.donnees()).to.eql({ reponse: 'Ma réponse' });
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
