import DepotRessources from 'commun/infra/depot_ressources';
import fondAccueil from 'accueil/assets/fond-accueil.jpg';
import tri from 'accueil/assets/tri.png';
import inventaire from 'accueil/assets/inventaire.png';
import controle from 'accueil/assets/controle.png';

const batiments = {
  'tri': tri,
  'inventaire': inventaire,
  'controle': controle
};

export default class DepotRessourcesAccueil extends DepotRessources {
  constructor (chargeurs) {
    super(chargeurs);
    this.charge([fondAccueil, tri, inventaire, controle]);
  }

  fondAccueil () {
    return this.ressource(fondAccueil);
  }

  batimentSituation (situation) {
    return this.ressource(batiments[situation]);
  }
}
