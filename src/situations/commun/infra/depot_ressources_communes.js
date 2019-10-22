import DepotRessources from 'commun/infra/depot_ressources';
import casque from 'commun/assets/casque.svg';
import sonConsigneCommune from 'commun/assets/consigne_commune.wav';

export default class DepotRessourcesCommunes extends DepotRessources {
  constructor (sonConsigne, chargeurs) {
    super(chargeurs);
    this.chargeContexte(require.context('commun/assets'));
    this.charge([sonConsigne, casque]);
    this.sonConsigne = sonConsigne;
  }

  consigne () {
    return this.ressource(this.sonConsigne);
  }

  consigneCommune () {
    return this.ressource(sonConsigneCommune);
  }

  casque () {
    return this.ressource(casque);
  }
}
