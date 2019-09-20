import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesInventaire from 'inventaire/infra/depot_ressources_inventaire';
import Situation from 'inventaire/modeles/situation';
import VueSituation from 'inventaire/vues/situation';

import reussite from 'inventaire/assets/reussite.wav';
import echec from 'inventaire/assets/echec.wav';

import { contenants, contenus } from 'inventaire/data/stock';

const situation = new Situation(
  { contenants, contenus },
  { reussite, echec }
);

const depotRessources = new DepotRessourcesInventaire();
afficheSituation('inventaire', situation, VueSituation, depotRessources);
