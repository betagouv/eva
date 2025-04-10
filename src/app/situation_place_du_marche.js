import 'core-js/stable';
import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesPlaceDuMarche from 'place_du_marche/infra/depot_ressources_place_du_marche';
import Situation from 'commun/modeles/situation';
import VueSituation from 'place_du_marche/vues/situation';
import { creeStore } from 'place_du_marche/modeles/store';

const situation = new Situation({ modeEntrainement: false, aideDisponible: true });

const depotRessources = new DepotRessourcesPlaceDuMarche();
const store = creeStore();
afficheSituation('place_du_marche', situation, VueSituation, depotRessources, store);
