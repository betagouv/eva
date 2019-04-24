import 'commun/styles/actions.scss';
import 'commun/styles/stop.scss';

import VueStop from 'commun/vues/stop';
import VueRejoueConsigne from 'commun/vues/rejoue_consigne';

export default class VueActions {
  constructor (situation, journal) {
    this.situation = situation;
    this.journal = journal;
    this.consigne = situation.audios.consigne;
  }

  affiche (pointInsertion, $) {
    this.$actions = $('<div class="actions"></div>');
    const stop = new VueStop(this.journal);
    const rejoueConsigne = new VueRejoueConsigne(this.consigne);

    stop.affiche(this.$actions, $);
    rejoueConsigne.affiche(this.$actions, $);
    $(pointInsertion).append(this.$actions);
  }

  cache () {
    this.$actions.addClass('invisible');
  }
}
