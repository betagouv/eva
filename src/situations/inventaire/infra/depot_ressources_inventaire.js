import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'inventaire/assets/consigne_demarrage.wav';
import croixRetourStock from 'inventaire/assets/croix.png';
import boutonSaisie from 'inventaire/assets/saisie-reponse.svg';

export default class DepotRessourcesInventaire extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne);
    this.charge([croixRetourStock, boutonSaisie]);
    this.chargeContexte(require.context('inventaire/assets'));
  }

  croixRetourStock () {
    return this.ressource(croixRetourStock);
  }

  boutonSaisie () {
    return this.ressource(boutonSaisie);
  }
}
