import DepotRessources from 'commun/infra/depot_ressources';
import fondAccueil from 'accueil/assets/fond-accueil.png';
import personnage from 'accueil/assets/personnage.png';
import tri from 'accueil/assets/tri.png';
import inventaire from 'accueil/assets/inventaire.png';
import controle from 'accueil/assets/controle.png';
import questions from 'accueil/assets/bureau.png';
import precedent from 'accueil/assets/precedent.svg';
import suivant from 'accueil/assets/suivant.svg';
import punaise from 'accueil/assets/punaise.svg';

const batiments = {
  tri,
  inventaire,
  controle,
  questions
};

export default class DepotRessourcesAccueil extends DepotRessources {
  constructor (chargeurs) {
    super(chargeurs);
    this.charge([fondAccueil, personnage, tri, inventaire, controle, questions, precedent, suivant, punaise]);
  }

  fondAccueil () {
    return this.ressource(fondAccueil);
  }

  personnage () {
    return this.ressource(personnage);
  }

  precedent () {
    return this.ressource(precedent);
  }

  suivant () {
    return this.ressource(suivant);
  }

  punaise () {
    return this.ressource(punaise);
  }

  batimentSituation (situation) {
    return this.ressource(batiments[situation]);
  }
}
