import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import RegistreCampagne from 'commun/infra/registre_campagne';
import sonConsigne from 'cafe_de_la_place/assets/consigne_cafe_de_la_place.mp3';
import sonConsigneBlanche from 'commun/assets/consigne_blanche.mp3';
import fondSituation from 'cafe_de_la_place/assets/terrasse_cafe.png';
import { extraitDictionnaire } from 'commun/infra/depot_ressources';

const audiosConsignesContext = require.context(
  'cafe_de_la_place/assets/audio_sous_consignes',
  false,
  /.mp3$/
);

const audiosQuestionsContext = require.context(
  'cafe_de_la_place/assets/audio_questions',
  false,
  /.mp3$/
);

const audiosReponsesContext = require.context(
  'cafe_de_la_place/assets/audio_reponses',
  true,
  /.mp3$/
);

const messagesAudios = {};
extraitDictionnaire(audiosConsignesContext, /\.\/(.+)\.mp3/, messagesAudios);
extraitDictionnaire(audiosQuestionsContext, /\.\/(.+)\.mp3/, messagesAudios);
extraitDictionnaire(audiosReponsesContext, /\.\/(.+\/.+)\.mp3/, messagesAudios);

const messagesVideos = {};

export default class DepotRessourcesCafeDeLaPlace extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    const questionsServeur = new RegistreCampagne().questions(['cafe_de_la_place']);
    super(chargeurs, messagesVideos, messagesAudios, fondSituation, sonConsigne, sonConsigneBlanche, questionsServeur);
    this.charge([fondSituation]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  fondSituationEntrainement () {
    return this.ressource(fondSituation);
  }
}
