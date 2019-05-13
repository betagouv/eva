import 'commun/styles/situation.scss';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesTri from 'tri/infra/depot_ressources_tri';
import Situation from 'tri/modeles/situation';
import VueSituation from 'tri/vues/situation';

import scenario from 'tri/data/pieces.js';

const situation = new Situation(scenario);

const depotRessources = new DepotRessourcesTri();
afficheSituation('tri', situation, VueSituation, depotRessources);
