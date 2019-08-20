import DepotRessources from 'commun/infra/depot_ressources';
import fondAccueil from 'accueil/assets/fond-accueil.png';
import personnages from 'accueil/assets/personnages.png';
import tri from 'accueil/assets/tri.png';
import inventaire from 'accueil/assets/inventaire.png';
import controle from 'accueil/assets/controle.png';
import questions from 'accueil/assets/questions.png';

const progression = require.context('accueil/assets', false, /progression[1-5]-sur-[1-5]\.png$/);

const batiments = {
  tri,
  inventaire,
  controle,
  questions
};

export default class DepotRessourcesAccueil extends DepotRessources {
  constructor (chargeurs) {
    super(chargeurs);
    this.charge([fondAccueil, personnages, tri, inventaire, controle, questions]);
    this.chargeContexte(progression);
    this._progression = progression.keys().reduce((memo, fichier) => {
      const match = fichier.match(/progression([1-5])-sur-([1-5])\.png$/);
      memo[match[1] + '-' + match[2]] = progression(fichier);
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

  progression (niveau, dernierNiveau) {
    if (!dernierNiveau) {
      return this.ressource(Object.values(this._progression)[0]);
    }
    return this.ressource(this._progression[niveau + '-' + dernierNiveau]);
  }
}
