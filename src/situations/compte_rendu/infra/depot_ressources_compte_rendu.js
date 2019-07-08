import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import accidentCarine from 'compte_rendu/assets/accident_carine.png';

import sonConsigne from 'controle/assets/consigne_demarrage.wav';

export default class DepotRessourcesCompteRendu extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(sonConsigne, chargeurs);
    this.charge([accidentCarine]);
  }

  accidentCarine () {
    return this.ressource(accidentCarine);
  }
}
