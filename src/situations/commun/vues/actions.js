import 'commun/styles/actions.scss';
import 'commun/styles/boutons.scss';
import { CHANGEMENT_ETAT, DEMARRE, ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI } from 'commun/modeles/situation';

import VueStop from 'commun/vues/stop';
import VueBoutonLectureConsigne from 'commun/vues/bouton_lecture_consigne';
import VueAide from 'commun/vues/aide';

import { creeAdaptateur } from './adaptateur_vue';

const AdapteurBoutonLectureConsigne = creeAdaptateur(VueBoutonLectureConsigne);

export default class VueActions {
  constructor (situation, journal, depotRessources, store) {
    this.situation = situation;
    this.journal = journal;
    this.depotRessources = depotRessources;
    this.store = store;
  }

  affiche (pointInsertion, $) {
    const $actions = $(`
      <div class="actions">
        <div class="actions-rejoue-consigne"></div>
        <div class="actions-aide"></div>
        <div class="actions-stop"></div>
      </div>
    `);
    this.$conteneurBoutonLectureConsigne = $actions.find('.actions-rejoue-consigne');
    this.$aide = $actions.find('.actions-aide');
    this.$stop = $actions.find('.actions-stop');

    this.boutonLectureConsigne = new AdapteurBoutonLectureConsigne(
      this.situation,
      this.depotRessources,
      {
        journal: this.journal
      },
      this.store
    );
    this.boutonLectureConsigne.affiche(this.$conteneurBoutonLectureConsigne, $);

    this.stop = new VueStop(this.situation, this.journal);
    this.aide = new VueAide(this.situation, this.depotRessources, this.journal);
    this.situation.on(CHANGEMENT_ETAT, (etat) => this.afficheBoutons(etat, $));
    this.afficheBoutons(this.situation.etat(), $);
    $(pointInsertion).append($actions);
  }

  afficheBoutons (etat, $) {
    const actionsEtat = new Map();
    actionsEtat.set(ENTRAINEMENT_DEMARRE, () => {
      this.boutonLectureConsigne.affiche(this.$conteneurBoutonLectureConsigne, $);
      this.stop.affiche(this.$stop, $);
    });
    actionsEtat.set(ENTRAINEMENT_FINI, () => {
      this.boutonLectureConsigne.cache();
    });
    actionsEtat.set(DEMARRE, () => {
      if (!this.situation.entrainementDisponible()) {
        this.boutonLectureConsigne.affiche(this.$conteneurBoutonLectureConsigne, $);
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
