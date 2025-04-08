import RejoueConsigne from 'commun/vues/rejoue_consigne.vue';
import JoueurConsigne from 'commun/composants/joueur_consigne';
import VueStop from 'commun/vues/stop';
import VueAide from 'commun/vues/aide';
import 'commun/styles/actions.scss';
import 'commun/styles/boutons.scss';
import { CHANGEMENT_ETAT, DEMARRE, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI } from 'commun/modeles/situation';
import { creeAdaptateur } from './adaptateur_vue';
export default class VueActions {
  constructor(situation, journal, depotRessources, store) {
    this.situation = situation;
    this.journal = journal;
    this.joueurConsigne = new JoueurConsigne(depotRessources, 'consigneDemarrage');
    this.depotRessources = depotRessources;
    this.store = store;
    this.AdapteurRejoueConsigne = creeAdaptateur(RejoueConsigne, { 
      joueurConsigne: this.joueurConsigne, 
      journal: this.journal
    });
  }

  affiche(pointInsertion, $) {
    const $actions = $(`
      <div class="actions">
        <div class="actions-rejoue-consigne"></div>
        <div class="actions-aide"></div>
        <div class="actions-stop"></div>
      </div>
    `);
    this.$rejoueConsigne = $actions.find('.actions-rejoue-consigne');
    this.$aide = $actions.find('.actions-aide');
    this.$stop = $actions.find('.actions-stop');

    this.rejoueConsigne = new this.AdapteurRejoueConsigne(
      this.situation,
      this.depotRessources,
      this.store,
      { 
        joueurConsigne: this.joueurConsigne, 
        journal: this.journal
      }
    );
    this.rejoueConsigne.affiche($actions.find('.actions-rejoue-consigne')[0], $);

    this.stop = new VueStop(this.situation, this.journal);
    this.aide = new VueAide(this.situation, this.depotRessources, this.journal);

    this.situation.on(CHANGEMENT_ETAT, (etat) => this.afficheBoutons(etat, $));
    this.afficheBoutons(this.situation.etat(), $);
    $(pointInsertion).append($actions);
  }

  afficheBoutons(etat, $) {
    const actionsEtat = new Map();
    actionsEtat.set(ENTRAINEMENT_DEMARRE, () => {
      this.rejoueConsigne.affiche(this.$rejoueConsigne[0], $);
      this.stop.affiche(this.$stop, $);
    });
    actionsEtat.set(ENTRAINEMENT_FINI, () => {
      this.rejoueConsigne.cache();
    });
    actionsEtat.set(DEMARRE, () => {
      if (!this.situation.entrainementDisponible()) {
        this.rejoueConsigne.affiche(this.$rejoueConsigne[0], $);
        this.stop.affiche(this.$stop, $);
      }
      if (this.situation.aideDisponible()) {
        this.aide.affiche(this.$aide, $);
      }
    });
    const changements = actionsEtat.get(etat);
    if (changements) {
      changements();
    }
  }
}
