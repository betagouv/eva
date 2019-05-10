import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'controle/assets/consigne_demarrage.mp3';

export default class DepotRessourcesControle extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(sonConsigne, chargeurs);
    this.chargeContexte(require.context('controle/assets'));
  }
}
