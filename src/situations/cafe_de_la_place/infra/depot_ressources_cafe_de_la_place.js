import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import sonConsigne from 'commun/assets/consigne_blanche.mp3';
import fondSituation from 'cafe_de_la_place/assets/liste_titres_musique.png';

import titre1 from 'cafe_de_la_place/assets/audio_questions/titre1.mp3';

import sonChoixBax from 'cafe_de_la_place/assets/audio_reponses/bax.mp3';
import sonChoixMasse from 'cafe_de_la_place/assets/audio_reponses/masse.mp3';
import sonChoixMax from 'cafe_de_la_place/assets/audio_reponses/max.mp3';

const AUDIOS_QUESTIONS = {
  titre_1: titre1
};

const AUDIOS_REPONSES = {
  bax: sonChoixBax,
  masse: sonChoixMasse,
  max: sonChoixMax
};

const messagesAudios = { ...AUDIOS_QUESTIONS, ...AUDIOS_REPONSES };

export default class DepotRessourcesCafeDeLaPlace extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, messagesAudios, fondSituation, sonConsigne);
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
