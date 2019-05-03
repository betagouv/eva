import 'commun/styles/actions.scss';
import 'commun/styles/stop.scss';

import VueStop from 'commun/vues/stop';
import VueRejoueConsigne from 'commun/vues/rejoue_consigne';

export default class VueActions {
  constructor (situation, journal, depot) {
    this.situation = situation;
    this.journal = journal;
    this.depot = depot;
  }

  affiche (pointInsertion, $) {
    this.$actions = $('<div class="actions"></div>');
    const stop = new VueStop(this.situation, this.journal);
    const rejoueConsigne = new VueRejoueConsigne(this.depot.consigne());

    stop.affiche(this.$actions, $);
    rejoueConsigne.affiche(this.$actions, $);
    $(pointInsertion).append(this.$actions);
  }

  cache () {
    this.$actions.addClass('invisible');
  }
}
