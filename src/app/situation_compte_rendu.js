import 'commun/styles/situation.scss';

import 'commun/infra/report_erreurs';

import { afficheSituation } from 'commun/vues/affiche_situation';

import DepotRessourcesCompteRendu from 'compte_rendu/infra/depot_ressources_compte_rendu';
import Situation from 'commun/modeles/situation';
import VueSituation from 'compte_rendu/vues/situation';
import { IDENTIFIANT_SITUATION_COMPTE_RENDU } from 'accueil/data/acces_situations';

const situation = new Situation();

const depotRessources = new DepotRessourcesCompteRendu();
afficheSituation(IDENTIFIANT_SITUATION_COMPTE_RENDU, situation, VueSituation, depotRessources);
