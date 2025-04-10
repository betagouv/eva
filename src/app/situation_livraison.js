import 'core-js/stable';
import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesLivraison from 'livraison/infra/depot_ressources_livraison';
import Situation from 'commun/modeles/situation';
import AdaptateurVueSituation from 'questions/vues/situation';
import { creeStore } from 'questions/modeles/store';

const situation = new Situation({ modeEntrainement: true });

const depotRessources = new DepotRessourcesLivraison();
const store = creeStore();
afficheSituation('livraison', situation, AdaptateurVueSituation, depotRessources, store);
