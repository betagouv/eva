import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import Situation from 'commun/modeles/situation';
import VueSituation from 'securite/vues/situation';
import sonConsigne from 'commun/assets/consigne_demarrage_blanche.wav';

const situation = new Situation();

const depotRessources = new DepotRessourcesCommunes(sonConsigne);
afficheSituation('securite', situation, VueSituation, depotRessources);
