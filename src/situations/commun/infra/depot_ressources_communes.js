import DepotRessources from 'commun/infra/depot_ressources';

export default class DepotRessourcesCommunes extends DepotRessources {
  constructor (sonConsigne, chargeurs) {
    super(chargeurs);
    const contexteRessourcesCommunes = require.context('commun/assets');
    const ressourcesCommunes = contexteRessourcesCommunes.keys().map(contexteRessourcesCommunes);
    this.charge(ressourcesCommunes);
    this.charge([sonConsigne]);
    this.sonConsigne = sonConsigne;
  }

  consigne () {
    return this.ressource(this.sonConsigne);
  }
}
