import 'commun/styles/boutons.scss';
import 'questions/styles/situation.scss';

import EventEmitter from 'events';

export const EVENEMENT_REPONSE = 'reponse';

export default class VueQuestion extends EventEmitter {
  constructor (depotRessources) {
    super();
    this.depotRessources = depotRessources;
  }

  affiche (pointInsertion, $) {}

  supprime () {
    this.$vue.remove();
  }
}
