import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesLivraison from 'livraison/infra/depot_ressources_livraison';
import Situation from 'commun/modeles/situation';
import AdaptateurVueSituation from 'questions/vues/situation';

const situation = new Situation({ modeEntrainement: true });

const depotRessources = new DepotRessourcesLivraison();
afficheSituation('livraison', situation, AdaptateurVueSituation, depotRessources);
