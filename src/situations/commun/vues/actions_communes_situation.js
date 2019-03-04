import 'commun/styles/go.scss';
import 'commun/styles/stop.scss';

import { VueStop } from 'commun/vues/stop.js';

export class ActionsCommunesSituation {
  constructor (pointInsertion, $, journal) {
    this.stop = new VueStop(pointInsertion, $, journal);
  }

  afficheElementEnCommun () {
    this.stop.afficher();
  }
}
