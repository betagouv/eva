import DepotRessourcesQuestion from 'questions/infra/depot_ressources_questions';

import sonConsigne from 'livraison/assets/consigne_demarrage_livraison.mp3';
import sonConsigneTransition from 'livraison/assets/consigne_transition_livraison.mp3';

export default class DepotRessourcesLivraison extends DepotRessourcesQuestion {
  constructor (chargeurs) {
    super(chargeurs, {}, {}, null, sonConsigne, sonConsigneTransition);
  }
}
