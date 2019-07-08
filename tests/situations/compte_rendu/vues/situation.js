import jsdom from 'jsdom-global';
import jQuery from 'jquery';

import Situation, { FINI } from 'commun/modeles/situation';
import EvenementReponseEnvoyee from 'compte_rendu/modeles/evenement_reponse_envoyee';
import VueSituation from 'compte_rendu/vues/situation';
import { EVENEMENT_REPONSE } from 'compte_rendu/vues/litteratie';
import MockDepotRessourcesCompteRendu from '../aides/mock_depot_ressources';

describe('La vue de la situation « Compte-rendu »', function () {
  let $;
  let depotRessources;
  let situation;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
    depotRessources = new MockDepotRessourcesCompteRendu();
    situation = new Situation();
  });

  it('enregistre la réponse dans le journal quand la vue émet un événement et passe la situation en fini', function () {
    const promesseDEnregistrement = Promise.resolve();
    const journal = {
      enregistre (evenement) {
        expect(evenement).to.be.a(EvenementReponseEnvoyee);
        expect(evenement.donnees()).to.eql({ reponse: 'Ma réponse' });
        return promesseDEnregistrement;
      }
    };
    const vue = new VueSituation(situation, journal, depotRessources);

    vue.affiche('#point-insertion', $);
    vue.question.emit(EVENEMENT_REPONSE, 'Ma réponse');

    return promesseDEnregistrement.then(() => {
      expect(situation.etat()).to.eql(FINI);
    });
  });
});
