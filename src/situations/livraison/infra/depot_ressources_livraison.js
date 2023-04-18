import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'livraison/assets/consigne_demarrage_livraison.mp3';
import sonConsigneTransition from 'livraison/assets/consigne_transition_livraison.mp3';
import fondSituation from 'questions/assets/illustration_questions/entrainement_livraison_1.jpg';

const messagesVideos = {};

export default class DepotRessourcesLivraison extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, messagesVideos, {}, fondSituation, sonConsigne, sonConsigneTransition);
  }

  imageAideComplementaire () {
    return this.calculatrice();
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }
}
