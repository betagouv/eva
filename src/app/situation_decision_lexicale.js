import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesDecisionLexicale from 'decision_lexicale/infra/depot_ressources_decision_lexicale';
import Situation from 'decision_lexicale/modeles/situation';
import VueSituation from 'decision_lexicale/vues/situation';

const situation = new Situation();

const depotRessources = new DepotRessourcesDecisionLexicale();
afficheSituation('decision_lexicale', situation, VueSituation, depotRessources);
