import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'inventaire/assets/consigne_demarrage.mp3';

export default class DepotRessourcesTri extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(sonConsigne, chargeurs);
  }
}
