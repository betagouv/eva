import 'core-js/stable';
import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesPrevention from 'prevention/infra/depot_ressources_prevention';
import Situation from 'commun/modeles/situation';
import AdaptateurVueSituation from 'prevention/vues/situation';
import { creeStore } from 'prevention/modeles/store';

const situation = new Situation({ modeEntrainement: true });

const depotRessources = new DepotRessourcesPrevention();
const store = creeStore();
afficheSituation('prevention', situation, AdaptateurVueSituation, depotRessources, store);
