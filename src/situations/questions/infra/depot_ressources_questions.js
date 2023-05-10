import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'questions/assets/consigne_demarrage_questions.mp3';
import sonConsigneBlanche from 'commun/assets/consigne_blanche.mp3';

export default class DepotRessourcesQuestions extends DepotRessourcesCommunes {
  constructor (chargeurs, messagesVideos = {}, messagesAudio = {}, fondConsigne = null, sonConsigneDemarrage = sonConsigne, sonConsigneTransition = sonConsigneBlanche ) {
    super(chargeurs, messagesVideos, messagesAudio, fondConsigne, sonConsigneDemarrage, sonConsigneTransition);
  }
}
