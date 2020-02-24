import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import sonConsigneDemarrage from 'maintenance/assets/consigne_demarrage.wav';

export default class DepotRessourcesObjetsTrouves extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigneDemarrage);
  }
}
