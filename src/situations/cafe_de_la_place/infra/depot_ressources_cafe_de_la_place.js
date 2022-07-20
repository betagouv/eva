import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import sonConsigne from 'cafe_de_la_place/assets/consigne_cafe_de_la_place.mp3';
import fondSituation from 'cafe_de_la_place/assets/terrasse_cafe.png';

// AUDIOS SOUS CONSIGNES
const audiosConsignesContext = require.context(
  'cafe_de_la_place/assets/audio_sous_consignes',
  false,
  /.mp3$/
);

// AUDIOS QUESTIONS
const audiosQuestionsContext = require.context(
  'cafe_de_la_place/assets/audio_questions',
  false,
  /.mp3$/
);

// AUDIOS REPONSES
const audiosReponsesContext = require.context(
  'cafe_de_la_place/assets/audio_reponses',
  true,
  /.mp3$/
);

const AUDIOS_CONSIGNES = audiosConsignesContext.keys().reduce((memo, fichier) => {
  memo[fichier.match(/\.\/(.+)\.mp3/)[1]] = audiosConsignesContext(fichier);
  return memo;
}, {});

const AUDIOS_QUESTIONS = audiosQuestionsContext.keys().reduce((memo, fichier) => {
  memo[fichier.match(/\.\/(.+)\.mp3/)[1]] = audiosQuestionsContext(fichier);
  return memo;
}, {});

const AUDIOS_REPONSES = audiosReponsesContext.keys().reduce((memo, fichier) => {
  memo[fichier.match(/\.\/.*\/(.+)\.mp3/)[1]] = audiosReponsesContext(fichier);
  return memo;
}, {});

const messagesVideos = {};
const messagesAudios = { ...AUDIOS_CONSIGNES, ...AUDIOS_QUESTIONS, ...AUDIOS_REPONSES };

export default class DepotRessourcesCafeDeLaPlace extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, messagesVideos, messagesAudios, fondSituation, sonConsigne);
    this.charge([fondSituation]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  fondSituationEntrainement () {
    return this.ressource(fondSituation);
  }
}
