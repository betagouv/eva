import 'core-js/stable';
import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesObjetsTrouves from 'objets_trouves/infra/depot_ressources_objets_trouves';
import Situation from 'commun/modeles/situation';
import VueSituation from 'objets_trouves/vues/situation';

const situation = new Situation();

const depotRessources = new DepotRessourcesObjetsTrouves();
afficheSituation('objets_trouves', situation, VueSituation, depotRessources);
