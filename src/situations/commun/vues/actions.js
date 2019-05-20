import 'commun/styles/actions.scss';
import 'commun/styles/stop.scss';
import { CHANGEMENT_ETAT, CONSIGNE_ECOUTEE, DEMARRE } from 'commun/modeles/situation';

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
    this.stop = new VueStop(this.situation, this.journal);
    this.rejoueConsigne = new VueRejoueConsigne(this.depot, this.journal);
    this.situation.on(CHANGEMENT_ETAT, (etat) => this.afficheBoutons(etat, $));
    this.afficheBoutons(this.situation.etat(), $);
    $(pointInsertion).append(this.$actions);
  }

  afficheBoutons (etat, $) {
    const actionsEtat = new Map();
    actionsEtat.set(CONSIGNE_ECOUTEE, () => {
      this.rejoueConsigne.affiche(this.$actions, $);
    });
    actionsEtat.set(DEMARRE, () => {
      this.rejoueConsigne.affiche(this.$actions, $);
      this.stop.affiche(this.$actions, $);
    });
    const changements = actionsEtat.get(etat);
    if (changements) {
      changements();
    }
  }

  cache () {
    this.$actions.addClass('invisible');
  }
}
