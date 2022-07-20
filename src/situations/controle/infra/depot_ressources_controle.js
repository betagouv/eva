import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import fondSituation from 'controle/assets/fond-situation.png';
import { extraitDictionnaire } from 'commun/infra/depot_ressources';
import tapis from 'controle/assets/tapis.png';
import sonConsigne from 'controle/assets/consigne_demarrage_controle.mp3';
import sonFondSonore from 'controle/assets/fond_sonore.mp3';

const biscuits = require.context('../assets', false, /(def[0-9]+|biscuit-normal)\.png$/);

const messagesVideos = {};

export default class DepotRessourcesControle extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, messagesVideos, {}, null, sonConsigne);
    this.chargeContexte(biscuits);
    this.charge([fondSituation, tapis, sonFondSonore]);

    this.biscuits = extraitDictionnaire(biscuits, /(def[0-9]+|biscuit-normal).png/);
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
}
