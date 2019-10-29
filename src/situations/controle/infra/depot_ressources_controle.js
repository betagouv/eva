import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import fondSituation from 'controle/assets/fond-situation.png';
import tapis from 'controle/assets/tapis.png';
import sonConsigne from 'controle/assets/consigne_demarrage.wav';
import sonFondSonore from 'controle/assets/fond_sonore.wav';
import sonKlaxon from 'controle/assets/klaxon.wav';

const biscuits = require.context('controle/assets', false, /(def[0-9]+|biscuit-normal)\.png$/);

export default class DepotRessourcesControle extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne);
    this.chargeContexte(biscuits);
    this.charge([fondSituation, tapis, sonFondSonore, sonKlaxon]);

    this.biscuits = biscuits.keys().reduce((memo, fichier) => {
      memo[fichier.match(/(def[0-9]+|biscuit-normal).png/)[1]] = biscuits(fichier);
      return memo;
    }, {});
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  tapis () {
    return this.ressource(tapis);
  }

  piece (type) {
    return this.biscuits[type];
  }

  fondSonore () {
    return this.ressource(sonFondSonore);
  }

  klaxon () {
    return this.ressource(sonKlaxon);
  }
}
