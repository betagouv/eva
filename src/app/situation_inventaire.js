import 'core-js/stable';
import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesInventaire from 'inventaire/infra/depot_ressources_inventaire';
import Situation from 'inventaire/modeles/situation';
import VueSituation from 'inventaire/vues/situation';

import { contenants, contenus, version } from 'inventaire/data/stock';

const situation = new Situation({ contenants, contenus }, version);

const depotRessources = new DepotRessourcesInventaire();
afficheSituation('inventaire', situation, VueSituation, depotRessources);
