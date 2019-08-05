import 'commun/styles/situation.scss';

import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';
import DepotRessourcesQuestions from 'questions/infra/depot_ressources_questions';
import Situation from 'questions/modeles/situation';
import VueSituation from 'questions/vues/situation';

const situation = new Situation();

const depotRessources = new DepotRessourcesQuestions();
afficheSituation('questions', situation, VueSituation, depotRessources);
