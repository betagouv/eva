import 'commun/styles/actions.scss';
import 'commun/styles/stop.scss';

import VueStop from 'commun/vues/stop';

export default class VueActions {
  constructor (journal) {
    this.journal = journal;
  }

  affiche (pointInsertion, $) {
    this.$actions = $('<div class="actions"></div>');
    $(pointInsertion).append(this.$actions);

    const stop = new VueStop(this.journal);
    stop.affiche('.actions', $);
  }

  cache () {
    this.$actions.addClass('invisible');
  }
}
