import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import fondSituation from 'plan_de_la_ville/assets/accueil_sans_eglise.png';
import egliseMaisonAPlacer from 'plan_de_la_ville/assets/eglise_maison_a_placer.png';
import personnage from 'plan_de_la_ville/assets/personnage.png';

import videoMaisonBleue from 'plan_de_la_ville/assets/video_questions/clic_maison_bleue.mp4';
import videoConsigneDragAndDrop from 'plan_de_la_ville/assets/video_questions/drag_and_drop.mp4';
import videoDeplacementDroite from 'plan_de_la_ville/assets/video_questions/deplacement_droite_maison_verte.mp4';

import modeEmploi from 'plan_de_la_ville/assets/audio_questions/mode_emploi.mp3';
import maisonRouge from 'plan_de_la_ville/assets/audio_questions/maison_rouge.mp3';
import maisonBleue from 'plan_de_la_ville/assets/audio_questions/clic_maison_bleue.mp3';
import saisieBoulangerie from 'plan_de_la_ville/assets/audio_questions/saisie_boulangerie.mp3';
import DragAndDrop from 'plan_de_la_ville/assets/audio_questions/drag_and_drop.mp3';
import DragAndDropMobile from 'plan_de_la_ville/assets/audio_questions/drag_and_drop_mobile.mp3';
import deplacementDroite from 'plan_de_la_ville/assets/audio_questions/deplacement_droite_maison_verte.mp3';
import sonConsigne from 'plan_de_la_ville/assets/consigne_plan_de_la_ville.mp3';

import sonChoixRouge from 'plan_de_la_ville/assets/audio_choix/rouge.mp3';
import sonChoixBleue from 'plan_de_la_ville/assets/audio_choix/bleue.mp3';
import sonChoixVerte from 'plan_de_la_ville/assets/audio_choix/verte.mp3';

import flecheGauche from 'commun/assets/choix_bidirectionnel/fleche_gauche.svg';
import flecheDroite from 'commun/assets/choix_bidirectionnel/fleche_droite.svg';

const AUDIOS_QUESTIONS = {
  mode_emploi: modeEmploi,
  couleur_maison: maisonRouge,
  drag_and_drop: DragAndDrop,
  drag_and_drop_mobile: DragAndDropMobile,
  clic_maison_bleue: maisonBleue,
  saisie_boulangerie: saisieBoulangerie,
  deplacement_droite_maison_verte: deplacementDroite
};

const AUDIOS_REPONSES = {
  rouge: sonChoixRouge,
  bleu: sonChoixBleue,
  vert: sonChoixVerte
};

const messagesVideos = {
  clic_maison_bleue: videoMaisonBleue,
  drag_and_drop: videoConsigneDragAndDrop,
  deplacement_droite_maison_verte: videoDeplacementDroite
};
const messagesAudios = { ...AUDIOS_QUESTIONS, ...AUDIOS_REPONSES };

export default class DepotRessourcesPlanDeLaVille extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, messagesVideos, messagesAudios, fondSituation, sonConsigne);
    this.charge([fondSituation, egliseMaisonAPlacer, personnage, flecheGauche, flecheDroite]);
  }

  chargeRessourcesQuestions (questions) {
    this.charge(questions.map(question => question.illustration));
  }

  chargeConfigurations (configurationNormale) {
    this.chargeRessourcesQuestions(configurationNormale.questions);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  egliseMaisonAPlacer () {
    return this.ressource(egliseMaisonAPlacer);
  }

  fondSituationEntrainement () {
    return this.ressource(fondSituation);
  }

  personnage () {
    return this.ressource(personnage);
  }

  flecheGauche () {
    return this.ressource(flecheGauche);
  }

  flecheDroite () {
    return this.ressource(flecheDroite);
  }
}
