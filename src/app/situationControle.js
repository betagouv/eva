import uuidv4 from 'uuid/v4';

import 'controle/styles/app.scss';

import DepotJournal from 'commun/infra/depot_journal';
import Journal from 'commun/modeles/journal';
import VueCadre from 'commun/vues/cadre';
import { initialise as initialiseInternationalisation, traduction } from 'commun/infra/internationalisation';
import RegistreUtilisateur from 'commun/infra/registre_utilisateur';

import Situation from 'controle/modeles/situation';
import VueSituation from 'controle/vues/situation';
import sonConsigne from 'controle/assets/consigne_demarrage.mp3';

import { scenario } from 'controle/data/pieces';

function afficheSituation (pointInsertion, $) {
  const session = uuidv4();
  const journal = new Journal(Date.now, session, 'controle', new DepotJournal(), new RegistreUtilisateur());

  const situation = new Situation({
    scenario: scenario,
    cadence: 5000,
    positionApparitionPieces: { x: 100, y: 70 },
    dureeViePiece: 12000,
    sonConsigne: sonConsigne
  });

  const vueSituation = new VueSituation(situation, journal);
  const vueCadre = new VueCadre(vueSituation, situation, journal);

  vueCadre.affiche(pointInsertion, $);
}

initialiseInternationalisation().then(function () {
  jQuery(function () {
    document.title = traduction('controle.titre');
    afficheSituation('body', jQuery);
  });
});
