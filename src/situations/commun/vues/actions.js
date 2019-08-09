import 'commun/styles/actions.scss';
import 'commun/styles/stop.scss';
import { CHANGEMENT_ETAT, CONSIGNE_ECOUTEE, DEMARRE } from 'commun/modeles/situation';

import VueStop from 'commun/vues/stop';
import VueRejoueConsigne from 'commun/vues/rejoue_consigne';
import JoueurConsigne from 'commun/composants/joueur_consigne';

export default class VueActions {
  constructor (situation, journal, depot) {
    this.situation = situation;
    this.journal = journal;
    this.joueurConsigne = new JoueurConsigne(depot);
  }

  affiche (pointInsertion, $) {
    this.$actions = $('<div class="actions"></div>');
    this.stop = new VueStop(this.situation, this.journal);
    this.rejoueConsigne = new VueRejoueConsigne(this.joueurConsigne, this.journal);
    this.situation.on(CHANGEMENT_ETAT, (etat) => this.afficheBoutons(etat, $));
    this.afficheBoutons(this.situation.etat(), $);
    $(pointInsertion).append(this.$actions);
  }

  afficheBoutons (etat, $) {
    const actionsEtat = new Map();
    actionsEtat.set(CONSIGNE_ECOUTEE, () => {
      this.rejoueConsigne.affiche(this.$actions, $, this.situation);
    });
    actionsEtat.set(DEMARRE, () => {
      this.stop.affiche(this.$actions, $);
      this.rejoueConsigne.affiche(this.$actions, $, this.situation);
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
