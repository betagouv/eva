import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'controle/assets/consigne_demarrage.mp3';

export default class DepotRessourcesControle extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs);
    this.charge([sonConsigne]);
    const contexteRessourcesControle = require.context('controle/assets');
    const ressourcesControle = contexteRessourcesControle.keys().map(contexteRessourcesControle);
    this.charge(ressourcesControle);
  }

  consigne () {
    return this.ressource(sonConsigne);
  }
}
