import DepotRessources from 'commun/infra/depot_ressources';
import accidentCarine from 'compte_rendu/assets/accident_carine.png';

export default class DepotRessourcesCompteRendu extends DepotRessources {
  constructor (chargeurs) {
    super(chargeurs);
    this.charge([accidentCarine]);
  }

  accidentCarine () {
    return this.ressource(accidentCarine);
  }
}
