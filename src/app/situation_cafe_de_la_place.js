import 'core-js/stable';
import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesCafeDeLaPlace from 'cafe_de_la_place/infra/depot_ressources_cafe_de_la_place';
import Situation from 'commun/modeles/situation';
import VueSituation from 'cafe_de_la_place/vues/situation';
import { creeStore } from 'cafe_de_la_place/modeles/store';

const situation = new Situation();

const depotRessources = new DepotRessourcesCafeDeLaPlace();
const store = creeStore();
afficheSituation('cafe_de_la_place', situation, VueSituation, depotRessources, store);
