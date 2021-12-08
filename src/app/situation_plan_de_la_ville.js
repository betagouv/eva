import 'core-js/stable';
import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import Situation from 'commun/modeles/situation';
import VueSituation from 'inventaire/vues/situation';
import DepotRessourcesPlanDeLaVille from 'plan_de_la_ville/infra/depot_ressources_plan_de_la_ville';

const situation = new Situation();

const depotRessources = new DepotRessourcesPlanDeLaVille();
afficheSituation('plan_de_la_ville', situation, VueSituation, depotRessources);
