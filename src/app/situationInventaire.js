import 'inventaire/styles/app.scss';

import { afficheSituation } from 'commun/vues/affiche_situation';

import { contenants, contenus } from 'inventaire/data/stock';
import Situation from 'inventaire/modeles/situation';

import VueSituation from 'inventaire/vues/situation';

import consigne from 'inventaire/assets/consigne_demarrage.mp3';
import reussite from 'inventaire/assets/reussite.mp3';
import echec from 'inventaire/assets/echec.mp3';

const situation = new Situation(
  { contenants, contenus },
  { consigne, reussite, echec }
);

afficheSituation('inventaire', situation, VueSituation, require.context('inventaire/assets'));
