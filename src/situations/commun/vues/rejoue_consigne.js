import { traduction } from 'commun/infra/internationalisation';
import VueBouton from './bouton';
import EvenementRejoueConsigne from '../modeles/evenement_rejoue_consigne';

import play from 'commun/assets/play.svg';
import lectureEnCours from 'commun/assets/lecture-en-cours.svg';
import 'commun/styles/bouton.scss';

export default class VueRejoueConsigne {
  constructor (consigne, journal) {
    this.consigne = consigne;
    this.journal = journal;
    this.vueBoutonLire = new VueBouton('bouton-lire-consigne', play, () => this.click(this.$));
    this.vueBoutonLire.ajouteUneEtiquette(traduction('situation.repeter_consigne'));
    this.vueBoutonLectureEnCours = new VueBouton('bouton-lecture-en-cours', lectureEnCours);
  }

  affiche (pointInsertion, $) {
    this.$ = $;
    this.pointInsertion = pointInsertion;
    this.vueBoutonLire.affiche(this.pointInsertion, $);
    $(this.consigne).on('ended', this.lectureTermine.bind(this));
  }

  click ($) {
    this.journal.enregistre(new EvenementRejoueConsigne());
    this.joueConsigne();
    this.vueBoutonLire.cache();
    this.vueBoutonLectureEnCours.affiche(this.pointInsertion, $);
  }

  joueConsigne () {
    this.consigne.play();
  }

  lectureTermine () {
    this.vueBoutonLectureEnCours.cache();
    this.vueBoutonLire.affiche(this.pointInsertion, this.$);
  }
}
