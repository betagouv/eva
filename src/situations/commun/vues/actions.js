import 'commun/styles/actions.scss';
import 'commun/styles/stop.scss';

import { VueStop } from 'commun/vues/stop.js';

export class VueActions {
  constructor (journal) {
    this.journal = journal;
  }

  affiche (pointInsertion, $) {
    const $actions = $('<div class="actions"></div>');
    const stop = new VueStop($actions, $, this.journal);
    stop.afficher();
    $(pointInsertion).append($actions);
  }
}
