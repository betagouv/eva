import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import fondSituation from 'plan_de_la_ville/assets/accueil_sans_eglise.png';
import maisonRouge from 'plan_de_la_ville/assets/audio_questions/maison_rouge.wav';
import sonConsigne from 'plan_de_la_ville/assets/consigne_plan_de_la_ville.wav';

import sonChoixRouge from 'plan_de_la_ville/assets/audio_choix/rouge.wav';
import sonChoixBleue from 'plan_de_la_ville/assets/audio_choix/bleue.wav';
import sonChoixVerte from 'plan_de_la_ville/assets/audio_choix/verte.wav';

const AUDIOS_QUESTIONS = {
  couleur_maison: maisonRouge
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
    this.charge([fondSituation]);
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

  fondSituationEntrainement () {
    return this.ressource(fondSituation);
  }
}
