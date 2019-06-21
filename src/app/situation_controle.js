import 'commun/styles/situation.scss';

import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';
import DepotRessourcesControle from 'controle/infra/depot_ressources_controle';
import Situation from 'controle/modeles/situation';
import VueSituation from 'controle/vues/situation';

import { scenario, bacs } from 'controle/data/pieces';

const situation = new Situation({
  scenario,
  bacs,
  cadence: 5000,
  positionApparitionPieces: { x: 100, y: 65.5 },
  dureeViePiece: 12000,
  sequenceKlaxons: [28000, 70000, 30000, 3000, 60000, 40000]
});

const depotRessources = new DepotRessourcesControle();
afficheSituation('controle', situation, VueSituation, depotRessources);
