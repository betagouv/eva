import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigneDemarrage from 'maintenance/assets/consigne_demarrage_maintenance.mp3';
import sonConsigneTransition from 'maintenance/assets/consigne_transition_maintenance.mp3';
import fondSituation from '../assets/fond-situation.jpg';
import croix from '../assets/croix.png';
import clavier from '../assets/clavier.svg';
import flecheGauche from '../assets/fleche_gauche.svg';
import flecheDroite from '../assets/fleche_droite.svg';

export default class DepotRessourcesMaintenance extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, {}, fondSituation, sonConsigneDemarrage, sonConsigneTransition);
    this.charge([fondSituation, croix, flecheGauche, flecheDroite, clavier]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  fondSituationEntrainement () {
    return this.ressource(fondSituation);
  }

  imageAideComplementaire () {
    return this.ressource(clavier);
  }

  croix () {
    return this.ressource(croix);
  }

  flecheGauche () {
    return this.ressource(flecheGauche);
  }

  flecheDroite () {
    return this.ressource(flecheDroite);
  }
}
