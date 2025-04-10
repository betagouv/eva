import 'core-js/stable';
import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesPlanDeLaVille from 'plan_de_la_ville/infra/depot_ressources_plan_de_la_ville';
import Situation from 'commun/modeles/situation';
import VueSituation from 'plan_de_la_ville/vues/situation';
import { creeStore } from 'plan_de_la_ville/modeles/store';

const situation = new Situation();

const depotRessources = new DepotRessourcesPlanDeLaVille();
const store = creeStore();
afficheSituation('plan_de_la_ville', situation, VueSituation, depotRessources, store);
