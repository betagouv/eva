import DepotRessources from 'commun/infra/depot_ressources';

export default class DepotRessourcesCommunes extends DepotRessources {
  constructor (chargeurs) {
    super(chargeurs);
    const contexteRessourcesCommunes = require.context('commun/assets');
    const ressourcesCommunes = contexteRessourcesCommunes.keys().map(contexteRessourcesCommunes);
    this.charge(ressourcesCommunes);
  }
}
