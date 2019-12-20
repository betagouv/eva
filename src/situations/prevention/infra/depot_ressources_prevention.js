import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigneDemarrage from 'commun/assets/consigne_blanche.wav';

export default class DepotRessourcesPrevention extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigneDemarrage);
  }
}
