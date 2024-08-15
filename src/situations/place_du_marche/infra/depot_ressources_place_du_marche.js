import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import sonConsigne from 'commun/assets/consigne_blanche.mp3';
import fondSituation from 'bienvenue/assets/bienvenue_background.jpg';
import RegistreCampagne from 'commun/infra/registre_campagne';
import { extraitQuestionsReponsesAudios } from 'commun/infra/depot_ressources';

const questionsServeur = new RegistreCampagne().questions('place_du_marche');
const AUDIOS_QUESTIONS_REPONSES = extraitQuestionsReponsesAudios(questionsServeur);

const messagesAudios = { ...AUDIOS_QUESTIONS_REPONSES };

const messagesVideos = {};

export default class DepotRessourcesPlaceDuMarche extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, messagesVideos, messagesAudios, null, sonConsigne);
    this.charge([fondSituation]);
  }

  illustrationQuestion () {
    return this.ressource(fondSituation);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  questions () {
    return questionsServeur;
  }
}
