import 'commun/styles/actions.scss';
import 'commun/styles/stop.scss';

import { VueStop } from 'commun/vues/stop';

export default class VueActions {
  constructor (journal) {
    this.journal = journal;
  }

  affiche (pointInsertion, $) {
    this.$actions = $('<div class="actions"></div>');
    const stop = new VueStop(this.$actions, $, this.journal);
    stop.affiche();
    $(pointInsertion).append(this.$actions);
  }

  cache () {
    this.$actions.addClass('invisible');
  }
}
