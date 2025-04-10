import 'core-js/stable';
import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesObjetsTrouves from 'objets_trouves/infra/depot_ressources_objets_trouves';
import Situation from 'commun/modeles/situation';
import VueSituation from 'objets_trouves/vues/situation';
import { creeStore } from 'objets_trouves/modeles/store';

const situation = new Situation({ modeEntrainement: true });

const depotRessources = new DepotRessourcesObjetsTrouves();
const store = creeStore();
afficheSituation('objets_trouves', situation, VueSituation, depotRessources, store);
