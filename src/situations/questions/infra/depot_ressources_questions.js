import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigneBlanche from 'commun/assets/consigne_blanche.mp3';

export default class DepotRessourcesQuestions extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, {}, {}, null, sonConsigneBlanche);
  }

  imageAideComplementaire () {
    return this.calculatrice();
  }
}
