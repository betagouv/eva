import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'inventaire/assets/consigne_demarrage.wav';
import fondSituation from '../assets/fond-situation.jpg';
import croix from '../assets/croix.png';
import flecheGauche from '../assets/fleche_gauche.svg';
import flecheDroite from '../assets/fleche_droite.svg';

export default class DepotRessourcesMaintenance extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne);
    this.charge([fondSituation, croix, flecheGauche, flecheDroite]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  fondSituationEntrainement () {
    return this.ressource(fondSituation);
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
