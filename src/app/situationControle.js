import uuidv4 from 'uuid/v4';

import 'controle/styles/app.scss';

import { DepotJournal } from 'commun/infra/depot_journal.js';
import { Journal } from 'commun/modeles/journal.js';
import { ActionsCommunesSituation } from 'commun/vues/actions_communes_situation.js';
import { VueCadre } from 'commun/vues/cadre.js';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';

import { Situation } from 'controle/modeles/situation.js';
import { VueSituation } from 'controle/vues/situation.js';

function afficheSituation (pointInsertion, $) {
  const session = uuidv4();
  const journal = new Journal(Date.now, session, 'controle', new DepotJournal());

  const situation = new Situation({
    scenario: [true, false, true],
    cadence: 3000,
    positionApparitionPieces: { x: 100, y: 70 },
    dureeViePiece: 12000
  });
  const vueSituation = new VueSituation(situation);
  const vueCadre = new VueCadre(vueSituation);
  vueCadre.affiche(pointInsertion, $);

  new ActionsCommunesSituation(pointInsertion, $, journal).afficheElementEnCommun();
}

initialiseInternationalisation().then(function () {
  jQuery(function () {
    document.title = traduction('controle.titre');
    jQuery('body').append('<div id="situation-controle" class="conteneur"></div>');

    afficheSituation('#situation-controle', jQuery);
  });
});
