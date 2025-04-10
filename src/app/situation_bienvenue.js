import 'core-js/stable';
import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesBienvenue from 'bienvenue/infra/depot_ressources_bienvenue';
import Situation from 'commun/modeles/situation';
import AdaptateurVueSituation from 'questions/vues/situation';
import { creeStore } from 'questions/modeles/store';

const situation = new Situation();

const depotRessources = new DepotRessourcesBienvenue();
const store = creeStore();
afficheSituation('bienvenue', situation, AdaptateurVueSituation, depotRessources, store);
