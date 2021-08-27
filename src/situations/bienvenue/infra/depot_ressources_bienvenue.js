import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'bienvenue/assets/consigne_demarrage.wav';

export default class DepotRessourcesBienvenue extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne);
  }
}
