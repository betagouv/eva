import 'inventaire/styles/app.scss';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesInventaire from 'inventaire/infra/depot_ressources_inventaire';
import Situation from 'inventaire/modeles/situation';
import VueSituation from 'inventaire/vues/situation';

import consigne from 'inventaire/assets/consigne_demarrage.mp3';
import reussite from 'inventaire/assets/reussite.mp3';
import echec from 'inventaire/assets/echec.mp3';

import { contenants, contenus } from 'inventaire/data/stock';

const situation = new Situation(
  { contenants, contenus },
  { consigne, reussite, echec }
);

const depotRessources = new DepotRessourcesInventaire();
afficheSituation('inventaire', situation, VueSituation, depotRessources);
