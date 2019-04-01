import uuidv4 from 'uuid/v4';

import 'controle/styles/app.scss';

import { DepotJournal } from 'commun/infra/depot_journal';
import { Journal } from 'commun/modeles/journal';
import { VueCadre } from 'commun/vues/cadre';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';

import { Situation } from 'controle/modeles/situation';
import { VueSituation } from 'controle/vues/situation';
import sonConsigneDemarrage from 'controle/assets/consigne_demarrage.mp3';

function afficheSituation (pointInsertion, $) {
  const session = uuidv4();
  const journal = new Journal(Date.now, session, 'controle', new DepotJournal());

  const situation = new Situation({
    scenario: [true, false, true],
    cadence: 3000,
    positionApparitionPieces: { x: 100, y: 70 },
    dureeViePiece: 12000,
    consigneAudio: sonConsigneDemarrage
  });
  const vueSituation = new VueSituation(situation);
  const vueCadre = new VueCadre(vueSituation, situation, journal);

  vueCadre.affiche(pointInsertion, $);
}

initialiseInternationalisation().then(function () {
  jQuery(function () {
    document.title = traduction('controle.titre');
    jQuery('body').append('<div id="situation-controle" class="conteneur"></div>');

    afficheSituation('#situation-controle', jQuery);
  });
});
