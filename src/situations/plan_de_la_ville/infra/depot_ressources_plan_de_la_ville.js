import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import fondSituation from 'plan_de_la_ville/assets/accueil_sans_eglise.png';
import egliseMaisonAPlacer from 'plan_de_la_ville/assets/eglise_maison_a_placer.png';
import modeEmploi from 'plan_de_la_ville/assets/audio_questions/mode_emploi.wav';
import maisonRouge from 'plan_de_la_ville/assets/audio_questions/maison_rouge.wav';
import maisonBleue from 'plan_de_la_ville/assets/audio_questions/clic_maison_bleue.wav';
import saisieBoulangerie from 'plan_de_la_ville/assets/audio_questions/saisie_boulangerie.wav';
import consigneDragAndDrop from 'plan_de_la_ville/assets/audio_questions/drag_and_drop.wav';
import deplacementDroite from 'plan_de_la_ville/assets/audio_questions/deplacement_droite_maison_verte.wav';
import sonConsigne from 'plan_de_la_ville/assets/consigne_plan_de_la_ville.wav';

import sonChoixRouge from 'plan_de_la_ville/assets/audio_choix/rouge.wav';
import sonChoixBleue from 'plan_de_la_ville/assets/audio_choix/bleue.wav';
import sonChoixVerte from 'plan_de_la_ville/assets/audio_choix/verte.wav';

const AUDIOS_QUESTIONS = {
  mode_emploi: modeEmploi,
  couleur_maison: maisonRouge,
  drag_and_drop: consigneDragAndDrop,
  clic_maison_bleue: maisonBleue,
  saisie_boulangerie: saisieBoulangerie,
  deplacement_droite_maison_verte: deplacementDroite
};

const AUDIOS_REPONSES = {
  rouge: sonChoixRouge,
  bleu: sonChoixBleue,
  vert: sonChoixVerte
};

const messagesAudios = { ...AUDIOS_QUESTIONS, ...AUDIOS_REPONSES };

export default class DepotRessourcesPlanDeLaVille extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, messagesAudios, sonConsigne);
    this.charge([fondSituation, egliseMaisonAPlacer]);
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
}
