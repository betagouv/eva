import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesQuestions from 'questions/infra/depot_ressources_questions';
import Situation from 'commun/modeles/situation';
import AdaptateurVueSituation from 'questions/vues/situation';

const situation = new Situation();

const depotRessources = new DepotRessourcesQuestions();
afficheSituation('livraison', situation, AdaptateurVueSituation, depotRessources);
