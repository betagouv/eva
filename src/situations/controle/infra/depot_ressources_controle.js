import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'controle/assets/consigne_demarrage.mp3';

const biscuits = require.context('controle/assets', false, /(def[0-9]+|biscuit-normal)\.png$/);

export default class DepotRessourcesControle extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(sonConsigne, chargeurs);
    this.chargeContexte(require.context('controle/assets'));

    this.biscuits = biscuits.keys().reduce((memo, fichier) => {
      memo[fichier.match(/(def[0-9]+|biscuit-normal).png/)[1]] = biscuits(fichier);
      return memo;
    }, {});
  }

  piece (type) {
    return this.biscuits[type];
  }
}
