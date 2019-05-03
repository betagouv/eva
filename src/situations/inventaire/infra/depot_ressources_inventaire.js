import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'inventaire/assets/consigne_demarrage.mp3';

export default class DepotRessourcesInventaire extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs);
    this.charge([sonConsigne]);
    const contexteRessourcesInventaire = require.context('inventaire/assets');
    const ressourcesInventaire = contexteRessourcesInventaire.keys().map(contexteRessourcesInventaire);
    this.charge(ressourcesInventaire);
  }

  consigne () {
    return this.ressource(sonConsigne);
  }
}
