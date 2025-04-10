import 'core-js/stable';
import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesQuestions from 'questions/infra/depot_ressources_questions';
import Situation from 'commun/modeles/situation';
import AdaptateurVueSituation from 'questions/vues/situation';
import { creeStore } from 'questions/modeles/store';

const situation = new Situation();

const depotRessources = new DepotRessourcesQuestions();
const store = creeStore();
afficheSituation('questions', situation, AdaptateurVueSituation, depotRessources, store);
