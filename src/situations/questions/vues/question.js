import 'commun/styles/boutons.scss';
import 'questions/styles/situation.scss';

import EventEmitter from 'events';

export const EVENEMENT_REPONSE = 'reponse';

export default class VueQuestion extends EventEmitter {
  constructor (question, srcResource) {
    super();
    this.question = question;
    this.srcResource = srcResource;
  }

  affiche (pointInsertion, $) {}

  supprime () {
    this.$vue.remove();
  }
}
