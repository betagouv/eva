import 'core-js/stable';
import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesSecurite from 'securite/infra/depot_ressources_securite';
import Situation from 'commun/modeles/situation';
import AdaptateurVueSituation from 'securite/vues/situation';
import { creeStore } from 'securite/modeles/store';

const situation = new Situation({ modeEntrainement: true, aideDisponible: true });

const depotRessources = new DepotRessourcesSecurite();
const store = creeStore();
afficheSituation('securite', situation, AdaptateurVueSituation, depotRessources, store);
