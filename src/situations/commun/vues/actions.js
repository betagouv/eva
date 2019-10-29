import 'commun/styles/actions.scss';
import 'commun/styles/bouton.scss';
import { CHANGEMENT_ETAT, DEMARRE, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI } from 'commun/modeles/situation';

import VueStop from 'commun/vues/stop';
import VueRejoueConsigne from 'commun/vues/rejoue_consigne';
import JoueurConsigne from 'commun/composants/joueur_consigne';

export default class VueActions {
  constructor (situation, journal, depot) {
    this.situation = situation;
    this.journal = journal;
    this.joueurConsigne = new JoueurConsigne(depot, 'consigneDemarrage');
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
    actionsEtat.set(ENTRAINEMENT_DEMARRE, () => {
      this.rejoueConsigne.affiche(this.$actions, $, this.situation);
      this.stop.affiche(this.$actions, $);
    });
    actionsEtat.set(ENTRAINEMENT_FINI, () => {
      this.rejoueConsigne.cache();
    });
    actionsEtat.set(DEMARRE, () => {
      if (!this.situation.entrainementDisponible()) {
        this.rejoueConsigne.affiche(this.$actions, $, this.situation);
        this.stop.affiche(this.$actions, $);
      }
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
