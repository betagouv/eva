import DepotRessources from 'commun/infra/depot_ressources';
import fondAccueil from 'accueil/assets/fond-accueil.jpg';
import personnages from 'accueil/assets/personnages.png';
import tri from 'accueil/assets/tri.png';
import inventaire from 'accueil/assets/inventaire.png';
import controle from 'accueil/assets/controle.png';

const progression = require.context('accueil/assets', false, /progression[1-5]\.png$/);

const batiments = {
  tri,
  inventaire,
  controle,
  questions: tri
};

export default class DepotRessourcesAccueil extends DepotRessources {
  constructor (chargeurs) {
    super(chargeurs);
    this.charge([fondAccueil, personnages, tri, inventaire, controle]);
    this.chargeContexte(progression);
    this._progression = progression.keys().reduce((memo, fichier) => {
      memo[fichier.match(/progression([1-5]).png/)[1]] = progression(fichier);
      return memo;
    }, {});
  }

  fondAccueil () {
    return this.ressource(fondAccueil);
  }

  personnages () {
    return this.ressource(personnages);
  }

  batimentSituation (situation) {
    return this.ressource(batiments[situation]);
  }

  progression (niveau) {
    return this.ressource(this._progression[niveau]);
  }
}
