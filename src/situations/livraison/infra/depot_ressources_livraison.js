import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'livraison/assets/consigne_demarrage_livraison.mp3';
import sonConsigneTransition from 'livraison/assets/consigne_transition_livraison.mp3';

export default class DepotRessourcesLivraison extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, {}, sonConsigne, sonConsigneTransition);
  }

  imageAideComplementaire () {
    return this.calculatrice();
  }
}
