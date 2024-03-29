import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import fondAccueil from 'accueil/assets/fond-accueil.jpg';
import casque from 'commun/assets/casque.svg';
import personnage from 'accueil/assets/personnage.png';
import avatarFin from 'accueil/assets/avatar-fin.png';
import consigneAccueil from 'accueil/assets/consigne_accueil.mp3';
import avatarAvis from 'accueil/assets/avatar-avis.svg';
import avatarDeconnexion from 'accueil/assets/avatar-deconnexion.svg';
import boutonAvis from 'accueil/assets/bouton-avis.svg';

import introduction from 'accueil/assets/audios_resultat/resultat_introduction.mp3';
import attentionConcentration from 'accueil/assets/audios_resultat/attention_concentration.mp3';
import comparaisonTri from 'accueil/assets/audios_resultat/comparaison_tri.mp3';
import organisationMethode from 'accueil/assets/audios_resultat/organisation_methode.mp3';
import vigilanceControle from 'accueil/assets/audios_resultat/vigilance_controle.mp3';
import vitesseExecution from 'accueil/assets/audios_resultat/vitesse_execution.mp3';
import { extraitDictionnaire } from 'commun/infra/depot_ressources';

const batimentsContext = require.context('../assets', false, /batiment-.+\.png$/);

const messagesVideos = {};
const AUDIOS_RESULTAT = {
  introduction: introduction,
  attention_concentration: attentionConcentration,
  comparaison_tri: comparaisonTri,
  organisation_methode: organisationMethode,
  vigilance_controle: vigilanceControle,
  rapidite: vitesseExecution
};

export default class DepotRessourcesAccueil extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, messagesVideos, AUDIOS_RESULTAT, fondAccueil, consigneAccueil);
    this.charge([fondAccueil, personnage, casque, avatarFin, avatarAvis, avatarDeconnexion, boutonAvis]);
    this.chargeContexte(batimentsContext);
    this.batiments = extraitDictionnaire(batimentsContext, /batiment-(.+)\.png/);
  }

  fondAccueil () {
    return this.ressource(fondAccueil);
  }

  personnage () {
    return this.ressource(personnage);
  }

  casque () {
    return this.ressource(casque);
  }

  avatarFin () {
    return this.ressource(avatarFin);
  }

  avatarAvis () {
    return this.ressource(avatarAvis);
  }

  avatarDeconnexion () {
    return this.ressource(avatarDeconnexion);
  }

  existeBatimentSituation (situation) {
    return !!this.batiments[situation];
  }

  batimentSituation (situation) {
    return this.ressource(this.batiments[situation]);
  }

  boutonAvis () {
    return this.ressource(boutonAvis);
  }
}
