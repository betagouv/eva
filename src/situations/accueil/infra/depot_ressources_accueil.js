import DepotRessources from 'commun/infra/depot_ressources';
import fondAccueil from 'accueil/assets/fond-accueil.jpg';
import tri from 'accueil/assets/tri.png';
import inventaire from 'accueil/assets/inventaire.png';
import controle from 'accueil/assets/controle.png';

const progression = require.context('accueil/assets', false, /progression[1-4]\.png$/);

const batiments = {
  'tri': tri,
  'inventaire': inventaire,
  'controle': controle
};

export default class DepotRessourcesAccueil extends DepotRessources {
  constructor (chargeurs) {
    super(chargeurs);
    this.charge([fondAccueil, tri, inventaire, controle]);
    this.chargeContexte(progression);
    this._progression = progression.keys().reduce((memo, fichier) => {
      memo[fichier.match(/progression([1-4]).png/)[1]] = progression(fichier);
      return memo;
    }, {});
  }

  fondAccueil () {
    return this.ressource(fondAccueil);
  }

  batimentSituation (situation) {
    return this.ressource(batiments[situation]);
  }

  progression (niveau) {
    return this.ressource(this._progression[niveau]);
  }
}
