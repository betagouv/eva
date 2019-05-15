import DepotRessources from 'commun/infra/depot_ressources';
import sonConsigneCommune from 'commun/assets/consigne_commune.mp3';

export default class DepotRessourcesCommunes extends DepotRessources {
  constructor (sonConsigne, chargeurs) {
    super(chargeurs);
    this.chargeContexte(require.context('commun/assets'));
    this.charge([sonConsigne]);
    this.sonConsigne = sonConsigne;
  }

  chargeContexte (contexte) {
    const ressources = contexte.keys().map(contexte);
    this.charge(ressources);
  }

  consigne () {
    return this.ressource(this.sonConsigne);
  }

  consigneCommune () {
    return this.ressource(sonConsigneCommune);
  }
}
