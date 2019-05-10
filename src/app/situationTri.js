import 'commun/styles/situation.scss';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesTri from 'tri/infra/depot_ressources_tri';
import Situation from 'commun/modeles/situation';
import VueSituation from 'tri/vues/situation';

const situation = new Situation();

const depotRessources = new DepotRessourcesTri();
afficheSituation('tri', situation, VueSituation, depotRessources);
