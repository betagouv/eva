import { traduction } from 'commun/infra/internationalisation';
import VueBouton from './bouton';
import EvenementRejoueConsigne from '../modeles/evenement_rejoue_consigne';

import play from 'commun/assets/play.svg';
import lectureEnCours from 'commun/assets/lecture-en-cours.svg';
import 'commun/styles/bouton.scss';

export default class VueRejoueConsigne {
  constructor (depotResources, journal) {
    this.depotResources = depotResources;
    this.journal = journal;
    this.vueBoutonLire = new VueBouton('bouton-lire-consigne', play, () => this.joueConsigne(this.$));
    this.vueBoutonLire.ajouteUneEtiquette(traduction('situation.repeter_consigne'));
    this.vueBoutonLectureEnCours = new VueBouton('bouton-lecture-en-cours', lectureEnCours);
    this.affichee = false;
  }

  affiche (pointInsertion, $) {
    if (this.affichee) {
      return;
    }
    this.affichee = true;
    this.$ = $;
    this.pointInsertion = pointInsertion;
    this.vueBoutonLire.affiche(this.pointInsertion, $);
  }

  joueConsigne ($) {
    this.journal.enregistre(new EvenementRejoueConsigne());
    this.vueBoutonLire.cache();
    this.vueBoutonLectureEnCours.affiche(this.pointInsertion, $);
    const consigne = this.depotResources.consigne();
    $(consigne).on('ended', this.lectureTermine.bind(this));
    consigne.start();
  }

  lectureTermine () {
    this.vueBoutonLectureEnCours.cache();
    this.vueBoutonLire.affiche(this.pointInsertion, this.$);
  }
}
